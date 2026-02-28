import './App.css'
import {useMemo, useState} from 'react';

export default function App() {

  function calcularCuotaHipoteca(importe: number, tasa: number, anos: number): number {
    const i = tasa / 100 / 12; // Tasa mensual en decimal
    const n = anos * 12;        // Número total de cuotas mensuales
    const cuota = importe * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
    return cuota;
  }
  
  // Configuración global (puede ser extendida en el futuro y usada desde cookies/sesiones)
  //const [locale, setLocale] = useState('es-ES');
  //const [currency, setCurrency] = useState('€');
  const currency = '€'; // Para simplificar, se mantiene como constante por ahora

  // Datos iniciales de la hipoteca (pueden ser obtenidos de una API o calculados dinámicamente)
  const [totalPrestamo, setTotalPrestamo] = useState(250000);
  const [tasaInteres, setTasaInteres] = useState(3.5);
  const [plazoAnos, setPlazoAnos] = useState(30);
  const cuotaMensual = useMemo(() => calcularCuotaHipoteca(totalPrestamo, tasaInteres, plazoAnos), [totalPrestamo, tasaInteres, plazoAnos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600">Primera Hipoteca</h1>
          <p className="text-gray-600">Calcula y visualiza tu hipoteca</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Amount Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-gray-500 text-sm font-semibold uppercase">Importe Total</div>
            <div className="text-3xl font-bold text-indigo-600 mt-2"
            id='importe-total'>
              {totalPrestamo.toFixed(2)}{currency}
            </div>
            <div className="text-xs text-gray-400 mt-1">Préstamo principal</div>
          </div>

          {/* Interest Rate Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-gray-500 text-sm font-semibold uppercase">Tasa de Interés</div>
            <div className="text-3xl font-bold text-green-600 mt-2"
            id='interes-total'>
              {tasaInteres}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Tasa anual</div>
          </div>

          {/* Years Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-gray-500 text-sm font-semibold uppercase">Plazo</div>
            <div className="text-3xl font-bold text-purple-600 mt-2"
            id='anos-total'>
              {plazoAnos}
            </div>
            <div className="text-xs text-gray-400 mt-1">Años</div>
          </div>

          {/* Monthly Payment Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-gray-500 text-sm font-semibold uppercase">Cuota Mensual</div>
            <div className="text-3xl font-bold text-blue-600 mt-2"
            id='cuota-mensual'>
              {cuotaMensual.toFixed(2)}{currency}
            </div>
            <div className="text-xs text-gray-400 mt-1">Pago mensual estimado</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Simulador de Hipoteca</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Importe del Préstamo
                  </label>
                  <input
                    type="number"
                    id='importe-id'
                    defaultValue={totalPrestamo.toFixed(2)}
                    onChange={(e) => setTotalPrestamo(parseFloat(e.target.value) || totalPrestamo)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tasa de Interés (%)
                    </label>
                    <input
                      type="number"
                      id='tasa-id'
                      defaultValue={tasaInteres}
                      step="0.1"
                      onChange={(e) => setTasaInteres(parseFloat(e.target.value) || tasaInteres)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Años
                    </label>
                    <input
                      type="number"
                      id='anos-id'
                      defaultValue={plazoAnos}
                      onChange={(e) => setPlazoAnos(parseInt(e.target.value) || plazoAnos)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Información</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-700">Total a Pagar:</span> {(cuotaMensual * 12 * plazoAnos).toLocaleString('es-ES', { maximumFractionDigits: 2 })}{currency}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Total Intereses:</span> {((cuotaMensual * 12 * plazoAnos) - totalPrestamo).toLocaleString('es-ES', { maximumFractionDigits: 2 })}{currency}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Cuotas Totales:</span> {plazoAnos * 12}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">¿Necesitas ayuda?</h3>
              <p className="text-sm opacity-90">Nuestro equipo está listo para asistirte en tu solicitud de hipoteca.</p>
              <button className="mt-4 w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => console.warn('TODO: Implementar función de contacto')}>
                Contactar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
