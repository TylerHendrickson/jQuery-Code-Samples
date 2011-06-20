function Node () {
    this.id;
    this.visible = false;
    this.nodeElem = null;
    this.toggleVis = function() {
        if (this.visible) { //make invisible
            $(this.nodeElem).find('label').hide();
            this.visible = false;
        } else { //Make visible
            $(this.nodeElem).children('label').show();
            this.visible = true;
        }
    }
}

Destination.prototype = new Node();
Destination.prototype.constructor = Destination;
function Destination(label, nextRef, id, nodeElem) {
    this.id = id;
    this.label = label;
    this.nodeElem = nodeElem;
    this.nextRef = nextRef;
    this.type = 'Destination;'
    this.clickAction = function () {
        console.log(this.label + " clicked");
        window.location = this.nextRef;
    }
}

Container.prototype = new Node();
Container.prototype.constructor = Container;
function Container(label, nextRef, id, nodeElem) {
    this.id = id;
    this.label = label;
    this.nodeElem = nodeElem;
    this.nextRef = nextRef;
    this.type = 'Container';
    this.open = false;
    this.clickAction = function () {
        var j = 0;
        var arrChildren = new Array();
        for (var i in this.nextRef) {
            arrChildren[j] = this.nextRef[i];
            j++;
        }
        if (this.open == true) {
            for(i = 0; i < arrChildren.length; i++) {
                element[arrChildren[i]].toggleVis();
            //console.log("Invisible: " + arrChildren[i].label);
            }
            console.log(this.label + " clicked -> closed");
            $(this.nodeElem).removeClass('open');
            this.open = false;
        //console.log("Container Closed: " + this.label);
        } else {
            for(i = 0; i < arrChildren.length; i++) {
                element[arrChildren[i]].toggleVis();
            //console.log("Visible: " + arrChildren[i].label);
            }
            console.log(this.label + " clicked -> opened");
            $(this.nodeElem).addClass('open');
            this.open = true;
        //console.log("Container Opened: " + this.label);
        }
    }
}
