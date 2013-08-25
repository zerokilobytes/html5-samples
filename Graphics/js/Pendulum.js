/*
        Ball Class
        */
        var Ball = function (radius, ctx) {
            this.radius = radius;
            this.color = '#FF0000';
            this.direction = 1;
            this.x = 0;
            this.y = 0;
            this.theta = Math.PI / 12;
            this.context = null;

            this.setContext = function (ctx) {
                this.context = ctx;
            }

            this.move = function (pivot) {
                var radiant = (6 * Math.PI / 180);
                this.theta = this.theta + (radiant * this.direction);

                this.x = (pivot.radius * Math.cos(this.theta)) + pivot.x;
                this.y = (pivot.radius * Math.sin(this.theta)) + pivot.y;

                if ((this.x + this.radius / 2) > (pivot.x + pivot.radius)) {
                    this.direction = this.direction * -1;
                }
                else if ((this.x - this.radius / 2) < (pivot.x - pivot.radius)) {
                    this.direction = this.direction * -1;
                }
            }

            this.draw = function () {
                this.context.beginPath();
                this.context.fillStyle = this.color;
                this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                this.context.closePath();
                this.context.fill();
            }
        }

        /*
        Rope Class
        */
        var Rope = function (x, y) {
            this.x = x;
            this.y = y;
            this.context = null;

            this.color = '#999';

            this.draw = function () {
                this.context.stroke();
            }

            this.move = function (x, y) {
                this.context.beginPath();
                this.context.moveTo(this.x, this.y);
                this.context.lineTo(x, y);
                this.context.lineWidth = 2;
                this.context.lineCap = 'butt';
                this.context.strokeStyle = this.color;
            }

            this.setContext = function (ctx) {
                this.context = ctx;
            }
        }

        /*
        Pivot Class
        */
        var Pivot = function (x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.context = null;
            this.rope = null;
            this.context;
            this.color = '#000';

            this.setContext = function (ctx) {
                this.context = ctx;
            }

            this.draw = function () {
                this.context.beginPath();
                this.context.fillStyle = this.color;
                this.context.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
                this.context.closePath();
                this.context.fill();
            }
            this.move = function (x, y) {
                this.rope = new Rope(this.x, this.y);
                this.rope.setContext(this.context);

                this.rope.move(x, y);
                this.rope.draw();
            }
        }

        function init() {
            var ctx;
            var ball;
            var pivot;

            ctx = canvas.getContext('2d');
            ball = new Ball(30);
            pivot = new Pivot(320, 100, 300);

            ball.setContext(ctx);
            pivot.setContext(ctx);

            setInterval(
                function () {
                    ctx.clearRect(0, 0, 650, 650);

                    ball.move(pivot);
                    pivot.move(ball.x, ball.y);

                    pivot.draw();
                    ball.draw();
                }, 100);
        }