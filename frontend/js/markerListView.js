define(['marionette', 'cardView'], function (Marionette, MarkerView) {

    const MarkerListView = Marionette.CollectionView.extend({
        childView: MarkerView,
        ChildViewContainer: '#list-container',
        id: 'list-container',
        viewComparator(instance){
            return instance.model.attributes.icon.title
        },

            initialize(collection, map)
            {
                this.collection = collection;
                this.map = map;
            }
        ,

            childViewOptions(model)
            {
                return {
                    map: this.map
                }
            }
        });

    return MarkerListView;

});