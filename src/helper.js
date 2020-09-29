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
	{text: 'REGIONAL 01', value: 'Regional 1'},
	{text: 'REGIONAL 02', value: 'Regional 2'},
	{text: 'REGIONAL 03', value: 'Regional 3'},
	{text: 'REGIONAL 04', value: 'Regional 4'},
	{text: 'REGIONAL 05', value: 'Regional 5'},
	{text: 'REGIONAL 06', value: 'Regional 6'},
	{text: 'REGIONAL 07', value: 'Regional 7'},
	{text: 'REGIONAL 08', value: 'Regional 8'},
	{text: 'REGIONAL 09', value: 'Regional 9'},
	{text: 'REGIONAL 10', value: 'Regional 10'},
	{text: 'REGIONAL 11', value: 'Regional 11'}
]
