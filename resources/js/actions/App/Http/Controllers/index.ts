import PencarianController from './PencarianController'
import PemesananController from './PemesananController'
import PembayaranController from './PembayaranController'
import InvoiceController from './InvoiceController'
import TiketController from './TiketController'
import JadwalController from './JadwalController'
import KeretaController from './KeretaController'
import StasiunController from './StasiunController'

const Controllers = {
    PencarianController: Object.assign(PencarianController, PencarianController),
    PemesananController: Object.assign(PemesananController, PemesananController),
    PembayaranController: Object.assign(PembayaranController, PembayaranController),
    InvoiceController: Object.assign(InvoiceController, InvoiceController),
    TiketController: Object.assign(TiketController, TiketController),
    JadwalController: Object.assign(JadwalController, JadwalController),
    KeretaController: Object.assign(KeretaController, KeretaController),
    StasiunController: Object.assign(StasiunController, StasiunController),
}

export default Controllers