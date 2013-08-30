var  Vector3D = function(){
		/// X coordinate of vector
        this.x = 0.0;

        /// Y coordinate of vector
        this.y = 0.0;

        /// Z coodinate of vector
        this.z = 0.0;
		
		this.init(x,y,z);
};

Vector3D.prototype = {
        

        /// Initializes a new instance of the Vector3D class
        /// Parameters are values of the vector coordinates
        /// <param name="x">X coordinate</param>
        /// <param name="y">Y coordinate</param>
        /// <param name="z">Z coordinate</param>
         init: function(x, y, z){
            this.x = x;
            this.y = y;
            this.z = z;
        },
        /// Gets or sets Z coordinate
        getZ: function (){
            return this.z;
        },
		setZ: function (z){
            this.z = z;
        },

        /// Gets or sets Y coordinate
        getY: function ()
            return this.y;
        },
		
		setY: function (y){
            this.y = y;
        },

        /// Gets or sets X coordinate
        getX: function(){
            return this.x
        },

        /// Sets all three coordinates of vector at a time
        /// copy coordinates of parameter vector
        /// <param name="p">Vector to copy</param>
        set: function(p){
            this.x = p.x;
            this.y = p.y;
            this.z = p.z;
        }

        /// Adds in place two vectors, coordinates by coordinates
        /// <param name="p">Vector to add</param>
        /// <returns>Current vector added with p</returns>
        add: function (p){
            this.x += p.x;
            this.y += p.y;
            this.z += p.z;
            return this;
        }

        /// Substracts in place two vectors, coordinates by coordinates
        /// <param name="p">Vector to substract</param>
        /// <returns>Current vector substracted of p</returns>
        function subtract(p){
            this.x -= p.x;
            this.y -= p.y;
            this.z -= p.z;
            return this;
        }

        /// Adds in place given values to vector coordinates
        /// <param name="a">Value to add to X coordinate</param>
        /// <param name="b">Value to add to Y coordinate</param>
        /// <param name="c">Value to add to Z coordinate</param>
        /// <returns>Current vector added with coordinates a, b and c</returns>
        function Vector3D Add(a, b, c)
        {
            this.x += a;
            this.y += b;
            this.z += c;
            return this;
        }

        /// <summary>
        /// Calculate the resultant of two vectors
        /// </summary>
        /// <param name="p">Vector to add</param>
        /// <returns>Resultant vector</returns>
        function Vector3D Plus(Vector3D p)
        {
            return new Vector3D(this.x + p.x, this.y + p.y, this.z + p.z);
        }

        /// <summary>
        /// Multiply vector coordinates by a constant
        /// </summary>
        /// <param name="f">Multiplying value</param>
        /// <returns>New vector f times longer</returns>
        function Vector3D Times(f)
        {
            return new Vector3D(this.x * f, this.y * f, this.z * f);
        }

        /// <summary>
        /// Divides vector coordinates by a constant
        /// </summary>
        /// <param name="f">Dividing value</param>
        /// <returns>New vector f times shorter</returns>
        function Vector3D Over(f)
        {
            return new Vector3D(this.x / f, this.y / f, this.z / f);
        }

        /// <summary>
        /// Calculate the resultant of two vectors
        /// </summary>
        /// <param name="p">Vector to substract</param>
        /// <returns>Resultant vector</returns>
        function Vector3D Minus(Vector3D p)
        {
            return new Vector3D(this.x - p.x, this.y - p.y, this.z - p.z);
        }

        /// <summary>
        /// Multiply in place vector coordinates by a constant
        /// </summary>
        /// <param name="f">Multiplying value</param>
        /// <returns>Current vector multiplyed by f</returns>
        function Vector3D MultiplyBy(f)
        {
            this.x *= f;
            this.y *= f;
            this.z *= f;
            return this;
        }

        /// <summary>
        /// Calculate distance to given vector
        /// </summary>
        /// <param name="p">Distant vector</param>
        /// <returns>Euclydian distance</returns>
        function DistanceTo(Vector3D p)
        {
            dx = this.x - p.x;
            dy = this.y - p.y;
            dz = this.z - p.z;
            return (float)Math.Sqrt((dx * dx) + (dy * dy) + (dz * dz));
        }

        /// <summary>
        /// Calculate distance to given coordinates
        /// </summary>
        /// <param name="x">X coordinate</param>
        /// <param name="y">Y coordinate</param>
        /// <param name="z">Z coordinate</param>
        /// <returns>Euclydian distance</returns>
        function DistanceTo(x, y, z)
        {
            dx = this.x - x;
            dy = this.y - y;
            dz = this.z - z;
            return 1.0F / Arithmetic.FastInverseSqrt((dx * dx) + (dy * dy) + (dz * dz));
        }

        /// <summary>
        /// Multiply two vectors, coordinate by coordinate
        /// </summary>
        /// <param name="p">Vector to multiply</param>
        /// <returns>New vector that holds multiplication result</returns>
        function Dot(Vector3D p)
        {
            return (this.x * p.x) + (this.y * p.y) + (this.z * p.z);
        }

        /// <summary>
        /// Calculate vector length
        /// </summary>
        /// <returns>Euclydian length</returns>
        function Length()
        {
            return (float)Math.Sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
        }

        /// <summary>
        /// Normalize a vector
        /// </summary>
        /// <returns>
        /// If vector is not null returns collinear vector with length 1
        /// Else returns vector null
        /// </returns>
        function Vector3D Unit()
        {
            l = this.Length();
            return l != 0.0F ? this.Over(l) : new Vector3D();
        }

        /// <summary>
        /// Resets vector to vector null
        /// </summary>
        function  Clear()
        {
            this.x = 0.0F;
            this.y = 0.0F;
            this.z = 0.0F;
        }

        /// <summary>
        /// Format vector for string output
        /// </summary>
        /// <returns>String representing vector</returns>
        function override string ToString()
        {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        }

        /// <summary>
        /// Calculate vectorial product
        /// u.Cross(v)
        /// </summary>
        /// <param name="p">Second term of vectorial product</param>
        /// <returns>Vectorial product u^v</returns>
        function Vector3D Cross(Vector3D p)
        {
            return new Vector3D(
                (this.y * p.z) - (this.z * p.y),
                (this.z * p.x) - (this.x * p.z),
                (this.x * p.y) - (this.y * p.x));
        }

        #endregion

    // function class Vector3D
    }