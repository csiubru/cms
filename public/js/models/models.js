window.Course = Backbone.Model.extend({

    urlRoot: "/courses",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.cid = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "ป้อนรหัสวิชา"};
        };

        this.validators.cnameT = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "ป้อนชื่อวิชา (ภาษาไทย)"};
        };

        this.validators.cnameE = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "ป้อนชื่อวิชา (English)"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        cid: "",
        cnameT: "",
        cnameE: "",
        ccredit: "",
        cgroup: "",
        cpre1: "",
        cpre2: "",
        cdescript: ""
        //ctext: ""

    }
});

window.CourseCollection = Backbone.Collection.extend({

    model: Course,

    url: "/courses"

});