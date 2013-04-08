
var ItemView = Backbone.View.extend({
      tagName: "li",
      className: "menu-items",
      template: JST['backbone/templates/item_template'],
      events: {
          "click .add": "addItemToOrder",
          "click"     : "getItemDescription"
      },
      render: function () {
          this.$el.html(this.template(this.model.toJSON()));
          return this;
      },
      addItemToOrder: function (event) {
          event.stopPropagation();
          var name = this.model.get("name"),
              price = this.model.get("price");
          Backbone.Mediator.pub("addFoodInOrder", {title: name, cost: price});
      },
      getItemDescription: function () {
          event.stopPropagation();
          var description = this.model.get("description");
          Backbone.Mediator.pub("popup", description);
      }
      
  });
  
  