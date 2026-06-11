export function useFormat() {
  function harga(amount: number) {
    return "Rp " + amount.toLocaleString("id-ID")
  }

  function waktu(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  function date(dateStr: string, options?: Intl.DateTimeFormatOptions) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      ...options
    })
  }

  function tanggalLengkap(dateStr: string, includeTime?: boolean) {
    const opts: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
    if (includeTime) {
      opts.hour = "2-digit"
      opts.minute = "2-digit"
    }
    return new Date(dateStr).toLocaleDateString("id-ID", opts)
  }

  return { harga, waktu, date, tanggalLengkap }
}
