package security;

import models.User;
import play.mvc.Http;
import play.mvc.Result;
import be.objectify.deadbolt.java.AbstractDeadboltHandler;
import be.objectify.deadbolt.java.DynamicResourceHandler;
import be.objectify.deadbolt.core.models.Subject;

import providers.APIPlayAuthenticate;
import com.feth.play.module.pa.user.AuthUserIdentity;

public class MyDeadboltHandler extends AbstractDeadboltHandler {

	@Override
	public Result beforeAuthCheck(final Http.Context context) {
		if (APIPlayAuthenticate.isLoggedIn(context.session())) {
			// user is logged in
			return null;
		} else {
			// user is not logged in

			// call this if you want to redirect your visitor to the page that
			// was requested before sending him to the login page
			// if you don't call this, the user will get redirected to the page
			// defined by your resolver
			final String originalUrl = APIPlayAuthenticate
					.storeOriginalUrl(context);

			context.flash().put("error",
					"You need to log in first, to view '" + originalUrl + "'");
			return redirect(APIPlayAuthenticate.getResolver().login());
		}
	}

	@Override
	public Subject getSubject(final Http.Context context) {
		final AuthUserIdentity u = APIPlayAuthenticate.getUser(context);
		// Caching might be a good idea here
		return User.findByAuthUserIdentity(u);
	}

	@Override
	public DynamicResourceHandler getDynamicResourceHandler(
			final Http.Context context) {
		return null;
	}

	@Override
	public Result onAuthFailure(final Http.Context context,
			final String content) {
		// if the user has a cookie with a valid user and the local user has
		// been deactivated/deleted in between, it is possible that this gets
		// shown. You might want to consider to sign the user out in this case.
		return forbidden("Forbidden");
	}
}
