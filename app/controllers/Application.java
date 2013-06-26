package controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;

import models.Activity;
import models.User;
import play.Routes;
import play.data.Form;
import play.data.validation.ValidationError;
import play.db.ebean.Model;
import play.libs.Json;
import play.mvc.*;
import play.mvc.Http.Response;
import play.mvc.Http.Session;
import providers.MyUsernamePasswordAuthProvider;
import providers.MyUsernamePasswordAuthProvider.MyLogin;
import providers.MyUsernamePasswordAuthProvider.MySignup;

import views.html.*;
import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;

import com.feth.play.module.pa.PlayAuthenticate;
import com.feth.play.module.pa.providers.password.UsernamePasswordAuthProvider;
import com.feth.play.module.pa.user.AuthUser;
import com.avaje.ebean.EbeanServer;

public class Application extends Controller {
  
	public static final String CLIENT_ORIGIN = "http://lvh.me:8080";
	public static final String SERVER_ORIGIN = "http://lvh.me:8080";
    public static final String FLASH_MESSAGE_KEY = "message";
	public static final String FLASH_ERROR_KEY = "error";
	public static final String USER_ROLE = "user";
	private static final Object ORIGINAL_URL = "pa.url.orig";
	
    public static Result index() {
        return ok(index.render("NoiseXperience2.0"));
    }
    
    public static Result out(){
    	response().setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);
    	ObjectNode result = Json.newObject();
    	result.put("status", "logout");
    	return ok(result);
    }

    
    public static Result addActivity() {
    	Activity activity = Form.form(Activity.class).bindFromRequest().get();
    	activity.save();
    	return redirect(routes.Application.index());
    }

    public static Result crossSide(String side) {
        response().setHeader("Access-Control-Allow-Origin", "http://lvh.me:8080");       // Need to add the correct domain in here!!
        response().setHeader("Access-Control-Allow-Credentials", "true"); 
        //response().setHeader("Access-Control-Max-Age", "300");          // Cache response for 5 minutes
        response().setHeader("Access-Control-Allow-Headers", "Origin, Credentials, X-Requested-With, Content-Type, Accept");         // Ensure this header is also allowed!  
        return ok();
    }
    
    public static Result getActivities(){
    	List<Activity> activities = new Model.Finder(String.class, Activity.class).all();
    	response().setHeader("Access-Control-Allow-Origin", "*");
    	return ok(Json.toJson(activities));
    }
    
    public static Result getActivity(Long id) {
    	  Activity activity = Activity.get(id);
    	  response().setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);
    	  return ok(Json.toJson(activity));
    	}
    
    //Authentification
    
	public static User getLocalUser(final Session session) {
		final AuthUser currentAuthUser = PlayAuthenticate.getUser(session);
		final User localUser = User.findByAuthUserIdentity(currentAuthUser);
		return localUser;
	}

	@Restrict(@Group(Application.USER_ROLE))
	public static Result restricted() {
		final User localUser = getLocalUser(session());
		return ok(profile.render(localUser));
	}

	@Restrict(@Group(Application.USER_ROLE))
	public static Result profile() {
		response().setHeader("Access-Control-Allow-Origin", "http://lvh.me:8080");
		response().setHeader("Access-Control-Allow-Credentials", "true");
		final User localUser = getLocalUser(session());
	 	ObjectNode result = Json.newObject();
    	result.put("name", localUser.name);
    	result.put("mail", localUser.email);
    	result.put("roles", Json.toJson(localUser.roles));
		return ok(result);
	}

	//Authentification
	
	public static Result login() {
		return ok(login.render(MyUsernamePasswordAuthProvider.LOGIN_FORM));
	}

	public static Result doLogin() {
		com.feth.play.module.pa.controllers.Authenticate.noCache(response());
		response().setHeader("Access-Control-Allow-Origin", "http://lvh.me:8080");
		response().setHeader("Access-Control-Allow-Credentials", "true");
		response().setHeader("Access-Control-Allow-Headers", "Origin, Credentials, X-Requested-With, Content-Type, Accept");         
		final Form<MyLogin> filledForm = MyUsernamePasswordAuthProvider.LOGIN_FORM
				.bindFromRequest();
		if (filledForm.hasErrors()) {
			// User did not fill everything properly
			ObjectNode result = Json.newObject();
			ArrayList<String> errorStrings = new ArrayList<String>();
			for(ValidationError error :  filledForm.globalErrors()){
				errorStrings.add(error.message());
			}
	    	result.put("errors", Json.toJson(errorStrings));
			return badRequest(result);
		} else {
			// Everything was filled
		 	//ObjectNode result = Json.newObject();
	    	//result.put("name", "Tesz");
	    	//result.put("mail","Teessst");
	    	//result.put("roles", "2");
			//return ok(result);
			//ctx().session().remove(ORIGINAL_URL);
			ctx().session().put("pa.isapi", "true");
			return MyUsernamePasswordAuthProvider.handleLogin(ctx());
		}
	}

	public static Result signup() {
		return ok(signup.render(MyUsernamePasswordAuthProvider.SIGNUP_FORM));
	}

	public static Result jsRoutes() {
		return ok(
				Routes.javascriptRouter("jsRoutes",
						controllers.routes.javascript.Signup.forgotPassword()))
				.as("text/javascript");
	}

	public static Result doSignup() {
		com.feth.play.module.pa.controllers.Authenticate.noCache(response());
		response().setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);
		final Form<MySignup> filledForm = MyUsernamePasswordAuthProvider.SIGNUP_FORM
				.bindFromRequest();
		if (filledForm.hasErrors()) {
			// User did not fill everything properly
			return badRequest(signup.render(filledForm));
		} else {
			// Everything was filled
			// do something with your part of the form before handling the user
			// signup
			return MyUsernamePasswordAuthProvider.handleSignup(ctx());
		}
	}

	public static String formatTimestamp(final long t) {
		return new SimpleDateFormat("yyyy-dd-MM HH:mm:ss").format(new Date(t));
	}

}
