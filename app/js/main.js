$(document).ready(function () {
  var data;
  var content = $('#content');
  var tblObj;
  content.hide();

  $.get("https://jsonplaceholder.typicode.com/posts", function (res) {
    data = res;
    tData = res;
  });

  $('#selectPosts').on('change', function(e){
    switch($(this).val()){
      case '-1':
      content.hide();
        break;
      case '1':
        tblObj?tblObj.destroy():'';
        buildDataTable(data);
        content.show();
        break;
      case '2': //Even Ids
        tblObj?tblObj.destroy():'';
        buildDataTable(data.filter(r=>r.id%2==0));
        content.show();
        break;
      case '3': //Odd Ids
        tblObj?tblObj.destroy():'';
        buildDataTable(data.filter(r=>r.id%2));
        content.show();
        break;
      default :
        content.hide();
    }
  });

  var addTitle = function(data, type, row){
    return '<span title="'+data+'">'+data+'</span>';
  };

  buildDataTable = function(ds){
    tblObj = $('#datatable').DataTable({
      data: ds,
      columns:[
        {data: "userId"},
        {data: "id"},
        {data: "title", render: addTitle},
        {data: "body", render: addTitle}
      ],
      'searching': false,
      'bLengthChange': false,
      'pageLength': 8
    });
  };
});