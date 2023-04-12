export const timeFormat = (date: Date) => {
  const options: any = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }

  return new Intl.DateTimeFormat('pt-BR', options).format(date)
}
