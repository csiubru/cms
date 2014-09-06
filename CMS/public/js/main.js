var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "courses"	: "list",
        "courses/page/:page"	: "list",
        "courses/add"         : "addCourse",
        "courses/:id"         : "courseDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var courseList = new CourseCollection();
        courseList.fetch({success: function(){
            $("#content").html(new CourseListView({model: courseList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    courseDetails: function (id) {
        var course = new Course({_id: id});
        course.fetch({success: function(){
            $("#content").html(new CourseView({model: course}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addCourse: function() {
        var course = new Course();
        $('#content').html(new CourseView({model: course}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'CourseView', 'CourseListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});