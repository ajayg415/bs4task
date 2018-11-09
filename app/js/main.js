$(document).ready(function () {
  var data;
  var content = $('#content');
  var tblObj;
  content.hide();

  (buildDropDown = function () {
    var optionList = [
      { 'value': 1, 'text': 'All Posts' },
      { 'value': 2, 'text': 'Even Posts' },
      { 'value': 3, 'text': 'Odd Posts' }
    ];

    $.each(optionList, function (i, el) {
      $('#selectPosts').append("<option value="+el.value+">" + el.text + "</option>");
    });
  })();

  $.get("https://jsonplaceholder.typicode.com/posts", function (res) {
    data = res;
  }).fail(function () {
    console.log("ajax call failed");
  }).always(function () {
    console.log("ajax call finished");
  });

  $('#selectPosts').on('change', function (e) {
    switch ($(this).val()) {
      case '-1':
        content.hide();
        break;
      case '1':
        tblObj ? tblObj.destroy() : '';
        buildDataTable(data);
        content.show();
        break;
      case '2': //Even Ids
        tblObj ? tblObj.destroy() : '';
        buildDataTable(data.filter(r => r.id % 2 == 0));
        content.show();
        break;
      case '3': //Odd Ids
        tblObj ? tblObj.destroy() : '';
        buildDataTable(data.filter(r => r.id % 2));
        content.show();
        break;
      default:
        content.hide();
    }
  });

  var addTitle = function (data, type, row) {
    return '<span title="' + data + '">' + data + '</span>';
  };

  buildDataTable = function (ds) {
    tblObj = $('#datatable').DataTable({
      data: ds,
      columns: [
        { data: "userId" },
        { data: "id" },
        { data: "title", render: addTitle },
        { data: "body", render: addTitle }
      ],
      'pageLength': 8,
      'dom': 'tp'
    });
  };
});