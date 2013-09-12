var Edge = function(id, node1, node2) {
    this.id;
    this.relatedNode1;
    this.relatedNode2;
    this.strength = 0.0;
    this.styleName = 0;
    this.verb = "";
    this.complement = "";
    this.physicRepresentation = new Spring();
    this.isVisible = true;
    this.isExplored = false;
    this.isDisposed = false;
    this.actions = [];
    this.drawingInformation = "";
    this.actions = [];
    this.typeName = "";
    this.drawingInformation = "";
    this.isDisposed = false;
    this.isExplored = false;
    this.isVisible = false;
    this.id = "";
    this.styleName = "";
    this.verb = "";
    this.complement = "";
    this.physicRepresentation = null;

    this.init(id, node1, node2);
};

Edge.prototype = {
    init: function(id, node1, node2) {
        this.id = id;
        this.relatedNode1 = node1;
        this.relatedNode1.linkList.push(this);
        this.relatedNode1.setRelativeMass();
        this.relatedNode2 = node2;
        this.relatedNode2.linkList.push(this);
        this.relatedNode2.setRelativeMass();
    },
    GUIDataChanged: function() {

    },
    /**
     * Gets the second node at end of the link
     */
    getTheOppositeNode: function(node) {
        if (node === this.relatedNode1) {
            return this.relatedNode2;
        }

        if (node === this.relatedNode2) {
            return this.relatedNode1;
        }
        return null;
    },
    /**
     * Dispose of the link
     * @returns {void}
     */
    dispose: function() {
        // Remove current link from link list of both nodes
        //TODO: FIX
        this.isDisposed = true;
        this.relatedNode1.linkList.Remove(this);
        this.relatedNode2.linkList.Remove(this);
        this.relatedNode1.isDeployed = false;
        this.relatedNode2.isDeployed = false;
        this.relatedNode1.setRelativeMass();
        this.relatedNode2.setRelativeMass();
        this.relatedNode1 = null;
        this.relatedNode2 = null;
        this.physicRepresentation.dispose();
    }
};