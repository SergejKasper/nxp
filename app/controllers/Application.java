package controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import models.Activity;
import models.User;
import play.Routes;
import play.data.Form;
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
  
    public static final String FLASH_MESSAGE_KEY = "message";
	public static final String FLASH_ERROR_KEY = "error";
	public static final String USER_ROLE = "user";
	
    public static Result index() {
        return ok(index.render("NoiseXperience2.0"));
    }

    
    public static Result addActivity() {
    	Activity activity = Form.form(Activity.class).bindFromRequest().get();
    	activity.save();
    	return redirect(routes.Application.index());
    }
    
    public static Result checkPreFlight() {
        response().setHeader("Access-Control-Allow-Origin", "*");       // Need to add the correct domain in here!!
        //response().setHeader("Access-Control-Allow-Methods", "POST");   // Only allow POST
        //response().setHeader("Access-Control-Max-Age", "300");          // Cache response for 5 minutes
        //response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");         // Ensure this header is also allowed!  
        return ok();
    }
    
    public static Result checkPreFlightOpt(Long id) {
        response().setHeader("Access-Control-Allow-Origin", "*");       // Need to add the correct domain in here!!
        //response().setHeader("Access-Control-Allow-Methods", "POST");   // Only allow POST
        //response().setHeader("Access-Control-Max-Age", "300");          // Cache response for 5 minutes
        //response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");         // Ensure this header is also allowed!  
        return ok();
    }
    
    public static Result getActivities(){
    	List<Activity> activities = new Model.Finder(String.class, Activity.class).all();
    	response().setHeader("Access-Control-Allow-Origin", "*");
    	return ok(Json.toJson(activities));
    }
    
    public static Result getActivity(Long id) {
    	  Activity activity = Activity.get(id);
    	  response().setHeader("Access-Control-Allow-Origin", "*");
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
		return ok(restricted.render(localUser));
	}

	@Restrict(@Group(Application.USER_ROLE))
	public static Result profile() {
		final User localUser = getLocalUser(session());
		return ok(profile.render(localUser));
	}

	//Authentification
	
	public static Result login() {
		return ok(login.render(MyUsernamePasswordAuthProvider.LOGIN_FORM));
	}

	public static Result doLogin() {
		com.feth.play.module.pa.controllers.Authenticate.noCache(response());
		final Form<MyLogin> filledForm = MyUsernamePasswordAuthProvider.LOGIN_FORM
				.bindFromRequest();
		if (filledForm.hasErrors()) {
			// User did not fill everything properly
			return badRequest(login.render(filledForm));
		} else {
			// Everything was filled
			return UsernamePasswordAuthProvider.handleLogin(ctx());
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
		final Form<MySignup> filledForm = MyUsernamePasswordAuthProvider.SIGNUP_FORM
				.bindFromRequest();
		if (filledForm.hasErrors()) {
			// User did not fill everything properly
			return badRequest(signup.render(filledForm));
		} else {
			// Everything was filled
			// do something with your part of the form before handling the user
			// signup
			return UsernamePasswordAuthProvider.handleSignup(ctx());
		}
	}

	public static String formatTimestamp(final long t) {
		return new SimpleDateFormat("yyyy-dd-MM HH:mm:ss").format(new Date(t));
	}

}
