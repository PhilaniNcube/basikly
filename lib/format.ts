const formatCurrency = (amount: number):string => {
  const formatter = Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(amount)
}

export default formatCurrency
