define(['marionette', 'collections'], function (Marionette, Collections) {
    var IconView = Marionette.View.extend({

        tagName: 'option',
        attributes: {
            'value': function () {
                return IconView.arguments['0'].model.attributes.id;
            },

            'selected': function () {
                //debugger
                if(IconView.arguments['0'].selectedId===IconView.arguments['0'].model.attributes.id) {return true;}
                return false;
            }
        },
        template: _.template(`<%= title %>`),

        onRender(){
            //debugger
        }
    });

    var IconListView = Marionette.CollectionView.extend({
        tagName: 'select',
        id: 'icon-select',
        className: 'form-control',
        template: false,
        childView: IconView,
        selectedId: null,

        initialize: function (collection, selectedId) {
            this.collection = collection;
            this.selectedId= selectedId;

        },
        childViewOptions(model){
            return {selectedId: this.selectedId}
        },
        onRender(){

        },

        onDestroy(){
        }
    });

    return IconListView;

})


