/* jshint esversion:6, node:true, loopfunc:true, undef: true, unused: true, sub:true */

(function(){
  
let DIA = {}

class Element {
  constructor(type, attr){
    this.type = type;
    this.attr = attr;
    this.child = [];
  }
  addAttribute(name, type, attr){
    let element = new Element("attribute", {name});
    element.appendElement(new Element(type, attr));
    this.appendElement(element);
  }
  appendElement(element){
    this.child.push(element);
  }
  build(indent){
    indent = indent || "";
    let inAttr = Object.keys(this.attr).map(key => key + "=\"" + this.attr[key] + "\"").join(" ");
    if(this.type == "string")
      return indent+"<dia:string>#"+this.attr.val+"#</dia:string>\n";
    if(!this.child.length)
      return indent+"<dia:"+this.type+" "+inAttr+"/>\n";
    let xml = indent+"<dia:"+this.type+" "+inAttr+">\n";
    this.child.forEach(child => xml += child.build(indent+"  "));
    xml += indent+"</dia:"+this.type+">\n";
    return xml;
  }
}

DIA.build = function(csc2){
  let obj = new Element("object", {type: "Database - Table", version: "0", id:"O0"});
  obj.addAttribute("obj_pos", "point", {val: "6.2,6.7"});
  obj.addAttribute("obj_bb", "rectangle", {val: "6.2,6.7;16.74,8.6"});
  obj.addAttribute("meta", "composite", {type: "dict"});
  obj.addAttribute("elem_corner", "point", {val: "6.2,6.7"});
  obj.addAttribute("elem_width", "real", {val: "10.54"});
  obj.addAttribute("elem_height", "real", {val: "1.9"});
  obj.addAttribute("text_colour", "color", {val: "#000000"});
  obj.addAttribute("line_colour", "color", {val: "#000000"});
  obj.addAttribute("fill_colour", "color", {val: "#FFFFFF"});
  obj.addAttribute("line_width", "real", {val: "0.1"});
  obj.addAttribute("name", "string", {val: name});
  obj.addAttribute("comment", "string", {val: ""});
  obj.addAttribute("visible_comment", "boolean", {val: "false"});
  obj.addAttribute("tagging_comment", "boolean", {val: "false"});
  obj.addAttribute("underline_primary_key", "boolean", {val: "true"});
  obj.addAttribute("bold_primary_keys", "boolean", {val: "false"});
  obj.addAttribute("normal_font", "font", {family: "monospace", style: "0", name: "Courier"});
  obj.addAttribute("name_font", "font", {family: "sans", style: "80", name: "Helvetica-Bold"});
  obj.addAttribute("comment_font", "font", {family: "sans", style: "0", name: "Helvetica"});
  obj.addAttribute("normal_font_height", "real", {val: "0.8"});
  obj.addAttribute("name_font_height", "real", {val: "0.7"});
  obj.addAttribute("comment_font_height", "real", {val: "0.7"});
  
  let att = new Element("attribute", {name: "attributes"});
  csc2.tag.forEach(function(tag){
    let unique = Object.values(csc2.keys).some(val => val.dup && val.keys.length == 1 && val.keys[0] == tag);
    let compo = new Element("composite", {type: "table_attribute"});
    compo.addAttribute("name", "string", {val: tag.name});
    compo.addAttribute("type", "string", {val: tag.type});
    compo.addAttribute("comment", "string", {val: ""});
    compo.addAttribute("primary_key", "boolean", {val: ""+unique});
    compo.addAttribute("nullable", "boolean", {val: "false"});
    compo.addAttribute("unique", "boolean", {val: ""+unique});
    att.appendElement(compo);
  });
  obj.appendElement(att);
  return obj.build();
};
      
if(typeof module !== 'undefined' && module.exports)
  module.exports = DIA;
else
  window.DIA = DIA;

})();