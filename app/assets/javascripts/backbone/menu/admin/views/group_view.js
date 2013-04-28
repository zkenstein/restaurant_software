(function (CategoryView,
           CategoryMenuView,
           CategoryCollection
           ) {
  window.RS.Views.AdminGroupView = Backbone.View.extend({

    tagName: "li",
    template: JST['backbone/menu/admin/templates/group_template'],
    events: {
        "click": "getCategories"
    },

    initialize: function() {
      this.categories_collection = new CategoryCollection();
      this.categories_collection.on("change", this.getCategories, this);

      //this.categories_collection.reset(window.RS.Data.Categories);
      this.categories_collection.fetch();


    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    addCategory: function(category) {
      console.log(category);
      var view_head = new CategoryMenuView();
      this.$("#add-category-form").html(view_head.render().el);
      var view = new CategoryView({model: category});
      this.$("#categories").append(view.render().el);
      return this;
    },

    getCategories: function(name) {
      this.clean();
      this.setActiveTab();
      console.log("get categories - click to groups tab");
      console.log(this.categories_collection);

      this.categories_collection.byGroup(this.model.get("name")).each(this.addCategory);
      return this;
    },

    setActiveTab: function () {
      $("#groups li").removeClass("active");
      this.$el.addClass("active");
    },

    clean: function () {
      $("#categories").empty();
      $("#items").empty();
    }

  });

})(
window.RS.Views.AdminCategoryView,
window.RS.Views.AdminCategoryMenuView,
window.RS.Collections.CategoryCollection
);
