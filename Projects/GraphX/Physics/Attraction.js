var Attraction = function() {
    this.strength = 0.0;
    this.minDist = 0.0;
};

Attraction.prototype = {
    init: function(end1, end2, k, d)
    {
        Force.prototype.init.call(this);

        this.strength = k;
        this.minDist = d;
        this.end1 = end1;
        this.end2 = end2;
    },
    IsOn: function() {
        return Force.prototype.init.IsOn(this);
    },
    apply: function() {
        if (this.IsOn()) {
            // Calculate distance between ends over the 3 dimensions
            var distX = this.end1.position.x - this.end2.position.x;
            var distY = this.end1.position.y - this.end2.position.y;
            var distZ = this.end1.position.z - this.end2.position.z;


            var oneOverDist = Arithmetic.fastInverseSqrt((distX * distX) + (distY * distY) + (distZ * distZ));
            var dist = 1.0 / oneOverDist;

            // Distance calculation is fast but not very precise, so : 
            if (dist !== 0.0) {

                distX *= oneOverDist;
                distY *= oneOverDist;
                distZ *= oneOverDist;

                // First part of the calculation for the attraction force
                var force = this.strength;

                // If distance is smaller thant set minum,
                if (dist < this.minDist) {
                    // limit the strength of attraction force
                    force /= this.minDist * this.minDist;
                }
                else {
                    // else, apply usual formula
                    force *= oneOverDist * oneOverDist;
                }

                // Correct distances depending on force
                distX *= force;
                distY *= force;
                distZ *= force;

                // Add the a new force to both ends
                end1.Force.Add(-distX, -distY, -distZ);
                end2.Force.Add(distX, distY, distZ);
            }

        }
    }
};