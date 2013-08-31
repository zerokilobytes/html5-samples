var Edge = function() {
    /// <summary>
    /// The link's ID
    /// </summary>
    this.id;

    /// <summary>
    /// First node relative to the link
    /// </summary>
    this.relatedNode1;

    /// <summary>
    /// Second node relative to the link
    /// </summary>
    this.relatedNode2;

    /// <summary>
    /// Strength of the link
    /// </summary>
    /// <remarks>Strength is a percentage, are between 1 and 100</remarks>
    this.strength = 0.0;

    /// <summary>
    /// Links's style
    /// </summary>
    this.styleName = 0;

    /// <summary>
    /// Verb used in the link description
    /// </summary>
    this.verb = "";

    /// <summary>
    /// Complement used in the link description
    /// </summary>
    this.complement = "";

    /// <summary>
    /// Link's physical representation
    /// </summary>
    /// TODO : move away ?
    //Spring type
    this.physicRepresentation = new Spring();

    /// <summary>
    /// Define whether the node is visible on the graph
    /// </summary>
    this.isVisible = false;

    /// <summary>
    /// Define whether the model manager explored this node during the exploration process.
    /// </summary>
    /// <remarks>
    /// this field is set to false after the initialiation of the exploration process.
    /// </remarks>
    this.isExplored = false;

    /// <summary>
    /// Define whether the link has been diposed or not
    /// </summary>
    this.isDisposed = false;

    /// <summary>
    /// This is the list of all actions the user can perform on the link and there respectives arguments
    /// Each action is represented in XML (@see the ICE Data file)
    /// </summary>
    this.actions = [];

    /// <summary>
    /// This is the Xml definition of all useful information used to draw the link on the graph
    /// </summary>
    this.drawingInformation = "";

    this.actions = [];

    this.typeName = "";

    this.drawingInformation = "";

    isDisposed = false;

    this.isExplored = false;

    this.isVisible = false;

    this.id = "";


    this.relatedNode1 = null;

    /// <summary>
    /// Gets second node relative to the link
    /// </summary>
    this.relatedNode2 = null;

    /// <summary>
    /// Gets or sets the strength of the link
    /// </summary>
    /// <remarks>Strength is a percentage, values must be between 1 and 100</remarks>
    this.strength = 0.0;

    /// <summary>
    /// Gets or sets the links's style
    /// </summary>
    this.styleName = "";

    /// <summary>
    /// Gets or sets the verb used in the link description
    /// </summary>
    this.verb = "";

    /// <summary>
    /// Gets or sets the complement used in the link description
    /// </summary>
    this.complement = "";

    /// <summary>
    /// Gets or sets the link's physical representation
    /// </summary>
    this.physicRepresentation = new Spring();
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
        if (node === this.relatedNode1)
        {
            return this.relatedNode2;
        }

        if (node === this.relatedNode2)
        {
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
        this.isDisposed = true;
        this.relatedNode1.LinkList.Remove(this);
        this.relatedNode2.LinkList.Remove(this);
        this.relatedNode1.IsDeployed = false;
        this.relatedNode2.IsDeployed = false;
        this.relatedNode1.SetRelativeMass();
        this.relatedNode2.SetRelativeMass();
        this.relatedNode1 = null;
        this.relatedNode2 = null;
        this.physicRepresentation.Dispose();
    }
};