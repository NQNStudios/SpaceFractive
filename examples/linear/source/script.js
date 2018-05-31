window.insertMarkdown = "";
window.addSection = function() {
  insertMarkdown = "{{Section2.5}}\n...\n[Next]({@Section3})";
  Core.RefreshCurrentSection();

  document.getElementById("__currentSection").innerHTML += Core.GetSection('Section1Addendum').innerHTML;
}
