function AnagramSolver ( txt ) {
    "use strict";

    this.tree = new Tree ();
    var t = txt.split ( /[?\s,\.]/ );
    for ( var a in t ) {
	this.tree.addKey ( t[a] );
    }

    this.makeAnagrams = function ( s ) {

	var tree = this.tree;
	var p = new Array();
	var hp = {};
	var ap = new Array();
	ap[0] = new Array();
	var ss = s.split( "" );

	for ( var t = 0; t < ss.length; t++ ){
	    ap[0].push ( tree.lookup( ss[t] ) );
	}
	for ( var k = 1; k < ss.length; k++ ){
	    findPerms ( k );
	}

	return p = p.sort ( function (a, b) {
	    if ( a.score > b.score ) return -1;
	    if ( a.score < b.score ) return 1;
	    if ( a.score === b.score ) return 0;
	});

	function findPerms ( lev ) {
	    ap[lev] = new Array ( );
	    for ( var j = 0; j < ap[lev-1].length; j++ ) {
		for ( var i = 0; i < ss.length; i++ ) {
		    if ( (ss[i] + ap[lev-1][j].data).match ( new RegExp ( ss[i], "g" ) ).length <= s.match( new RegExp ( ss[i], "g" ) ).length ){
			var look = tree.lookup ( ss[i], ap[lev-1][j] );
			if ( look != -1 ){
			    if ( look.childs > 0 ){
				ap[lev].push ( look );
			    }
			    if ( look.score !== null ) 
				if ( hp[look.data] === undefined ) {
				    hp[look.data] = 0;
				    p.push( look );
				}
			}
		    }
		}
	    }
	}
    }

    function Node ( sf ) {
	this.score = null;
	this.data = sf;
	this.childs = 0;
	this.children = {};
	this.setData = function ( numb ) {
	    this.score = numb;
	}
    }

    function Tree () {
	this.root = new Node ( null, null );
	var values = { "a":1,"b":4,"c":4,"d":2,"e":1,"f":4,"g":3,"h":3,"i":1,
		       "j":10,"k":5,"l":2,"m":4,"n":2,"o":1,"p":4,"q":10,"r":1,
		       "s":1,"t":1,"u":2,"v":5,"w":4,"x":8,"y":3,"z":10 };
	this.addKey = function ( s ) {
	    var node = this.root;
	    var ss = s.split ( "" );
	    var num = 0;
	    var st = "";
	    for ( var d = 0; d < ss.length; d++ ) {	
		if ( ! /[&\^%4#!@\*\)\(\}\{\[\]\\\|/><-_=\~`+?]/.test(ss[d]) ) {
		    st += ss[d];
		    if ( node.children[ss[d]] === undefined ) {
			node.children[ss[d]] = new Node ( st );
			node.childs++;
		    }
		    node = node.children[ss[d]];
		    num += values[ss[d]];
		}
	    }
	    node.setData ( num );
	}
	this.lookup = function ( s, n ) {
	    var node = ( n === undefined || n === null ) ? this.root : n;
	    var ss = s.toLowerCase().split ( "" );
	    for ( var d = 0; d < ss.length; d++ ) {
		if ( node.children[ss[d]] === undefined ) {
		    return -1;
		}
		node = node.children[ss[d]];
	    }
	    return node;
	}
    }
}
