import { router } from "@inertiajs/vue3"

export function useConfirmDelete(entity: string) {
  function hapus(url: string, label?: string) {
    const overlay = document.createElement("div")
    overlay.className = "fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"

    const card = document.createElement("div")
    card.className =
      "bg-popover text-popover-foreground mx-4 flex max-w-sm flex-col gap-4 rounded-xl border p-6 shadow-lg"

    const header = document.createElement("div")
    header.className = "flex items-center justify-between gap-2"

    const msg = document.createElement("p")
    msg.className = "text-sm font-medium"
    msg.textContent = label
      ? `Yakin ingin menghapus ${entity} ${label}?`
      : `Yakin ingin menghapus ${entity} ini?`
    header.appendChild(msg)

    card.appendChild(header)

    const actions = document.createElement("div")
    actions.className = "flex justify-end gap-2"

    const batalBtn = document.createElement("button")
    batalBtn.className =
      "border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center gap-2 rounded-md border px-3 text-xs font-medium whitespace-nowrap cursor-pointer"
    batalBtn.textContent = "Batal"
    batalBtn.onclick = () => document.body.removeChild(overlay)
    actions.appendChild(batalBtn)

    const hapusBtn = document.createElement("button")
    hapusBtn.className =
      "bg-destructive text-foreground hover:bg-destructive/70 inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium whitespace-nowrap cursor-pointer"
    hapusBtn.textContent = "Hapus"
    hapusBtn.onclick = () => {
      document.body.removeChild(overlay)
      router.delete(url)
    }
    actions.appendChild(hapusBtn)

    card.appendChild(actions)
    overlay.appendChild(card)
    overlay.onclick = () => document.body.removeChild(overlay)
    card.onclick = e => e.stopPropagation()

    document.body.appendChild(overlay)
  }

  return { hapus }
}
