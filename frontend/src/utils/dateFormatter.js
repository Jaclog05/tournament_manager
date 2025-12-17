const formatDateTime = (dateString, includeTime = false) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' });
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  let formattedDate = `${day} ${formattedMonth}`;

  if(includeTime) {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    formattedDate += ` - ${hours}:${minutes}`
  }
  return formattedDate;
}

export default formatDateTime;