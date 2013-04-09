var OrderView = Backbone.View.extend({
  //el: $("#order-container"),
  tagName: "div",
  className: "wrap",

  template: JST['backbone/templates/OrderTemplate'],

  events: {
    "click #cancel_order" : "cancelOrder",
    "click #close_order" : "closeOrder"
  },

  initialize: function() {
    Backbone.Mediator.sub("addItemToOrder", this.renderOne, this);
    Backbone.Mediator.sub("addAllFood", this.renderAll, this);
    Backbone.Mediator.sub("clearOrderView", this.clearView, this);
    Backbone.Mediator.sub("changeTotal", this.renderTotal, this);
    Backbone.Mediator.sub("showManageBlock", this.showManageBlock, this);
    Backbone.Mediator.sub("hideManageBlock", this.hideManageBlock, this);
  },

  render: function() {
    var total = Waiter.Order.OrderCollection.total;
    this.$el.html(this.template({total: 0}));
    return this;
  },

  renderOne: function(item) {
    var view = new OrderItemView({model: item});
    $("#order-items").append(view.render().el);
  },

  renderAll: function() {
    var collection = Waiter.Order.OrderCollection;
    collection.forEach(function(item) {
      Waiter.Order.OrderView.renderOne(item);
    });
  },

  renderTotal: function() {
    $("#total").html(Waiter.Order.OrderCollection.order.get("total"));
  },

  clearView: function() {
    $("#order-items").html("");
    $("#total").html("0");
  },

  cancelOrder: function() {
    Backbone.Mediator.pub("changeStateOfOrder", "cancelled");
    this.clearView();
  },

  closeOrder: function() {
    Backbone.Mediator.pub("changeStateOfOrder", "closed");
    this.clearView();
  },

  showManageBlock: function() {
    $("#manage-block").removeClass("hide");
  },

  hideManageBlock: function() {
    $("#manage-block").addClass("hide");
  }

});