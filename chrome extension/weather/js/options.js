var city = localStorage.city || "beijing";
document.getElementById('city').value = city;
document.getElementById('save').onclick = function() {
    localStorage.city = document.getElementById('city').value;
    alert('保存成功');
};