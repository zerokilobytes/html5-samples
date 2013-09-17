var GraphLoader = function() {

};

GraphLoader.prototype = {
};

GraphLoader.readXML = function(url, nodeCallback, edgeCallback) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: function(xml) {
            GraphLoader.loadGraph(xml, nodeCallback, edgeCallback);
        }
    });
};

GraphLoader.loadGraph = function(xml, nodeCallback, edgeCallback) {
    $(xml).find('graphml').find('graph').each(function() {
        $(this).find('node').each(function() {
            var id = $(this).attr('id');
            var data = $(this).find('data').text();
            nodeCallback({
                id: id,
                data: data}
            );
        });

        $(this).find('edge').each(function() {
            var id = $(this).attr('id');
            var source = $(this).attr('source');
            var target = $(this).attr('target');
            var data = $(this).find('data').text();
            edgeCallback({
                id: id,
                source: source,
                target: target,
                data: data
            });
        });
    });
};