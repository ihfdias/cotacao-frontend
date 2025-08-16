/**
 * Busca a lista de feriados nacionais para um determinado ano.
 * @param {number} year O ano para buscar os feriados.
 * @returns {Promise<Array>} Uma lista de objetos de feriados.
 */
async function getHolidays(year) {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
    if (!response.ok) {
      console.error("Falha ao buscar feriados.");
      return [];
    }
    const holidays = await response.json();
    return holidays;
  } catch (error) {
    console.error("Erro ao conectar à API de feriados:", error);
    return [];
  }
}

/**
 * Verifica se a data de hoje é um dia útil (não é fim de semana nem feriado nacional).
 * @returns {Promise<boolean>} Retorna true se for um dia útil, false caso contrário.
 */
export async function isWorkingDay() {
  const today = new Date();
  const dayOfWeek = today.getDay(); 

 
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }

  
  const year = today.getFullYear();
  const holidays = await getHolidays(year);
  
  const todayString = today.toISOString().split('T')[0];

  const isHoliday = holidays.some(holiday => holiday.date === todayString);

  if (isHoliday) {
    return false;
  }

  return true;
}
