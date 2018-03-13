



var global_source_text = [ "他", "是", "小", "猫", "<eos>"];
var global_target_text = [ "he", "is", "a", "little", "cat", "<eos>"];
var global_align_list =  [[0.52410376, 0.13841674, 0.17038098, 0.10238403, 0.064714432], [0.38465452, 0.26518634, 0.18046838, 0.097542852, 0.072147928], [0.00066794478, 0.0040362747, 0.96730459, 0.023921983, 0.0040691751], [0.0055221315, 0.007827743, 0.90721226, 0.062354017, 0.017083818], [0.0034489201, 0.060021043, 0.5319038, 0.099268898, 0.30535728], [0.0060129552, 0.11651923, 0.06157266, 0.038631193, 0.77726394]] ;


function show_alignment(source_text, target_text, align_list){
  var body_width = document.body.clientWidth/12*3.5;
    // $("#targetinput").html(decodeURI(body_width));
  document.getElementById("alignment").innerHTML = "<h3><p>Alignment Matrix</p></h3>"+"<a href=#alignment title=\"show large one\"><canvas id=\"myCanvas\" width=\""+String(body_width)+"\" height=\""+String(body_width)+"\"></canvas></a>";


  var source_length = source_text.length;
  var target_length = target_text.length;
  var step = 40;
  var font = 20;
  var x_offset = font * 9;
  var y_offset = font * 7;
  body_width ;//-= font*10;
  if (target_length > source_length) {
    step = body_width/target_length;
  }
  else {
    step = body_width/source_length;
  }
  if (step > 45) {
    step = 45;
  }
  var font = step/2.3;
  var x_offset = font * 9;
  var y_offset = font * 7;
  
  for (var i=0; i<source_length; i++) {
    var c=document.getElementById("myCanvas");
    var cxt=c.getContext("2d");
    // cxt.rotate(0)
    cxt.moveTo(i*step+x_offset, y_offset);
    // cxt.lineTo(i*step+x_offset, step*(target_length)+y_offset);
    cxt.moveTo(0,0);
    cxt.textAlign = "left";
    cxt.textBaseline="top";
    cxt.font = String(font)+"px Arial";
    cxt.translate(x_offset+(i+2.3)*step, -step*1.5);
    cxt.rotate(-Math.PI/3);
    // cxt.fillText(source_text[i], -y_offset/(1-1/3), 0);
    cxt.fillText(decodeURI(source_text[i]), -y_offset/(1-1/3), 0);
    cxt.rotate(Math.PI/3); 
    cxt.translate(-(x_offset+(i+2.3)*step), step*1.5);
    console.log(i, source_text[i], decodeURI(source_text[i]), i*step+x_offset);
  }
  cxt.moveTo(source_length*step+x_offset, y_offset);
  // cxt.lineTo(source_length*step+x_offset, step*(target_length)+y_offset);

  for (var j=0; j<target_length; j++){
    var c=document.getElementById("myCanvas");
    var cxt=c.getContext("2d");
    // cxt.moveTo(x_offset,j*step+y_offset);
    // cxt.lineTo(step*(source_length)+x_offset, j*step+y_offset);
    cxt.font = String(font)+"px Arial";
    cxt.textAlign = "left";
    cxt.fillText(decodeURI(target_text[j]), (0.8-decodeURI(target_text[j]).length/17.)*x_offset, j*step+step/3+y_offset);
    console.log(j, target_text[j], decodeURI(target_text[j]), (0.8-decodeURI(target_text[j]).length/17.));
  }
  // cxt.moveTo(x_offset,target_length*step+y_offset);
  // cxt.lineTo(step*(source_length)+x_offset, target_length*step+y_offset);
  for (var j=0; j<target_length; j++){
    for (var i=0; i<source_length; i++){
      wa = align_list[j][i]
      // if (wa < 0.1) {
      //   wa = 0.
      // }
      color = parseInt(255*wa);
      if (color < 16){
        code = "0"+(color).toString(16);
      }
      else{
        code = (color).toString(16);
      }
      // console.log(code);
      cxt.fillStyle="#"+code+code+code;
      // console.log(color, cxt.fillStyle, target_text[j], decodeURI(source_text[i]), align_list[j][i]);
      // console.log("#"+(color).toString(16)+(color).toString(16)+(color).toString(16));
      // console.log(step);
      cxt.fillRect(i*step+x_offset, j*step+y_offset, step, step);
    }
  }
  cxt.stroke();
}


show_alignment(global_source_text, global_target_text, global_align_list)