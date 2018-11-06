define(['marionette', 'cardView'], function (Marionette, MarkerView) {

    const MarkerListView = Marionette.CollectionView.extend({
        childView: MarkerView,
        ChildViewContainer: '#list-container',
        id: 'list-container',
        viewComparator(instance){
            return instance.model.attributes.icon.title
        },
            //iconCol: null,

            initialize(collection, map)
            {
                this.collection = collection;
                this.map = map;
                //alert('init col')
                // this.iconCol= iconCol;
            }
        ,

            onRender()
            {
                //debugger
                // let that=this;
                // this.children.forEach(function (child) {
                //    child.iconCol= that.iconCol;
                //    console.log(child.iconCol);
                // });
                // debugger
            }
        ,

            childViewOptions(model)
            {
               // alert('childVOpt')
                return {
                    // selectedId: this.selectedId,
                    map: this.map
                }
            }
        });

    return MarkerListView;

});