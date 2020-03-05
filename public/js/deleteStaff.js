$(document).ready(function(){
    $('.delete_button').on('click',function(e){
        $target = $(e.target);
        const id =$target.attr('data-id')
        $.ajax({
            type:'DELETE',
            url:'/manager/personnel/'+id,
            success : function(res){
                alert('Deleting staff member');
            },
            error : function(err){
                alert(err.status)
            }
        })
    });
});