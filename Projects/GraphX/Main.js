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
    var node1 = universe.createNode("", "");
    var node2 = universe.createNode("", "");
    var node3 = universe.createNode("", "");

    var node4 = universe.createNode("", "");
    //node1.physicRepresentation.makeFixed();

    universe.createEdge("", node1, node2);
    universe.createEdge("", node1, node3);
    universe.createEdge("", node2, node3);
    universe.createEdge("", node1, node4);

    universe.physicsManager.settings_Changed();
}