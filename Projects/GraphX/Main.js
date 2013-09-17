var universe = null;

function loop() {
    universe.update(null);
    universe.draw();

    requestAnimFrame(function() {
        loop();
    });
}
window.onload = function() {
    init();
    loop();
};

function init() {
    universe = new UniverseManager();
    GraphLoader.readXML("sample.graphml", createNode, createEdge);
    universe.physicsManager.settings_Changed();
}

function createNode(element) {
    universe.createNode(element.id, "");
}
function createEdge(element) {
    universe.createEdge("", element.source, element.target);
}