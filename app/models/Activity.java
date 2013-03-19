package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import com.avaje.ebean.EbeanServer;
import play.db.ebean.Model;

@Entity
public class Activity extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public Long id;
	public String title;
	public String description;
	public String path;

	public static Activity get(Long id) {
		return find.ref(id);
	}

	public static Finder<Long, Activity> find = new Finder<Long, Activity>(
			Long.class, Activity.class);
}
