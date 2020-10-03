export const periodeView = (date) => {
    var year    = date.getFullYear();
    var month   = date.getMonth()+1; 
    var day     = date.getDate();
    var hour    = date.getHours();
    var minute  = date.getMinutes();
    var second  = date.getSeconds(); 
    if(month.toString().length === 1) {
         month = '0'+month;
    }
    if(day.toString().length === 1) {
         day = '0'+day;
    }   
    if(hour.toString().length === 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length === 1) {
         minute = '0'+minute;
    }
    if(second.toString().length === 1) {
         second = '0'+second;
    }   

    var dateTime = year+'-'+month; //+' '+hour+':'+minute+':'+second;   
    return dateTime;
}

export const listReg = [
	{text: 'SEMUA REGIONAL', value: '00'},
    {text: 'PUSAT', value: '01'},
	{text: 'REGIONAL 01', value: 'REGIONAL 1'},
	{text: 'REGIONAL 02', value: 'REGIONAL 2'},
	{text: 'REGIONAL 03', value: 'REGIONAL 3'},
	{text: 'REGIONAL 04', value: 'REGIONAL 4'},
	{text: 'REGIONAL 05', value: 'REGIONAL 5'},
	{text: 'REGIONAL 06', value: 'REGIONAL 6'},
	{text: 'REGIONAL 07', value: 'REGIONAL 7'},
	{text: 'REGIONAL 08', value: 'REGIONAL 8'},
	{text: 'REGIONAL 09', value: 'REGIONAL 9'},
	{text: 'REGIONAL 10', value: 'REGIONAL 10'},
	{text: 'REGIONAL 11', value: 'REGIONAL 11'}
]
