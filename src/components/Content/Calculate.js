
// Hp - толщина подката мм
// h0 h1 - толщина полосы до и после пропуска м
// hn - толщина полосы в нейтральном сечении м
// b - ширина полосы м
// R0 - номинальный радиус рабочих валков м
// Rd - радиус упруго деформированного рабочего валкам
// dh1 - упругое восстановление полосы на выходе из валков м
// Lup - длина зоны упругого восстановления полосы м
// LcLplLplc - длина зоны пластического формоизменения м
// L1 - приращещение длины дуги контакта за линией центров недеформированных валковм
// dx - шаг разбиения зоны пластического формоизменения м
// SlminSlmaxSl - показатель протяженности зоны опережения очага деформации
// Lon - длина зоны опережения очага деформации м
// ah - степенной показатель аппроксимации контактных поверхностей

// Sigmat0 - исходный предел текучести МПа
// а1, а2, а3 - эмпирические коэффициенты зависящие от химического состава стали
// En, Eb - модуль Юнга материала полосы и материала валков МПа
// wb - коэффициент Пуассона материала валков
// rm - плотность деформируемого металла МПа*(с/м)в кв.
// ip - передаточное число


// Vb - окружная скорость валков м/с
// V1 - скорость выхода металла из очага деформации м/с
// Son - опережение %
// kon - коэффициентопережения
// Sigma0, Sigma1 - соответственно напряжения заднего и переднего натяженияМПа
// Sigma1p - расчетное напряжение переднего натяжения
// Sigmamax - предел деформационного упрочнения прокатываемого металла МПа

// ks - константа контактной поверхности
// kl - коэффициент непрерывности смазочного слоя
// etta - динамическая вязкость технологической смазки МПа*с
// dzetta - толщина слоя технологической смазки в очаге деформации м
// f - средний коэффициент трения
// f0on - опорное значение коэффициента трения в зоне опережения
// f0ot - опорное значение коэффициента трения в зоне отставания
// fup - коэффициент трения в зоне упругого восстановления
// af - степенной показатель эпюры коэффициента трения

// PprMprNpr - соответственно силамомент и мощность прокатки MНкН*м и кВт соответственно
// psrup - давление металла на валки в зоне упругого восстановления МПа
// tauup - среднее контактное касательное напряжение на упругом участке МПа
// psr - среднее давление металла на валки МПа
// Mtrp - момент трения в подшипниках валков кН*м
// Mtr - момент добавочных сил тения кН*м


// х1(2) - текущая геометрическая координата м
// xot - относительная геометрическая координата
// hx1(2) - текущая толщина полосы в очаге деформации м
// Tgalfax2 - тангенс угла контакта металла с валками в пределах элементарного объема
// ax2(i) - угол контакта элементарного объема металла с валками
// ех1(2) - текущая интенсивность деформации
// es1(2) - текущее относительное обжатие

// Dvakx1(2) - текущее сопротивление деформации МПа
// Sigmakx1(2) - сопротивление деформации в приконтактном слое металла МПа
// taukx1(2) - сопротивлеление чистому сдвигу в приконтактном слое металла МПа
// Sigmax1(2) - переменные нормальные осевые напряжения МПа
// рх1(2) - переменное по длине очага деформации давлениеметалла на валки МПа
// taux1(2) - контактные касательные напряжения МПа
// psrx - площадь эпюры давления металла на валки на участке длиной dx МПа*м
// tausrx - площадь эпюры контактных касательных напряжений МПа*м
// fx1(2) - переменный в очаге деформации коэффициент трения

// Vx1(2) - текущая скорость металла в очаге деформации м/с
// Vskx1(2) - скорость скольжения м/с
// ax2(i) - ускорение частиц деформируемого металла м/(с^2)

// n - кол-во разбиений зоны пластического формоизменения металла
// i -счетчик циклов
// delta - допустимая ошибка при определении длины дуги контакта%
// е - допустимая ошибка при определении длины зоны опережения очага деформации
// ac - вспомогательные переменные (для записи результатов расчета в файл и таблицу на форме)
// symmap symmam - вспомогательные перемнные при расчете силы и момента прокатки

import '../../utils/round'

export async function getResultsArray(params) {

    // Объявление переменных
    let n = params.n
    let Hp = params.Hp
    let b = params.b
    let R0 = params.R0
    let ah = params.ah
    let Sigmat0 = params.Sigmat0
    let e = params.e
    let symmap
    let symmam
    let Delta
    let result = ''

    // Геометрические характеристики очага деформации
    let h0 = params.h0
    let h1 = params.h1
    let hn
    let Rd
    let dh1
    let Lup
    let Lc
    let Lpl
    let Lplc
    let L1
    let dx
    let Slmin
    let Slmax
    let Sl
    let Lon
    let ec
    let Sigmat

    // Механические свойства металла и валков
    let Sigmamax = params.Sigmamax
    let a1 = params.a1
    let a2 = params.a2
    let a3 = params.a3
    let En = params.En
    let Eb = params.Eb
    let wb = params.wb
    let rm = params.rm

    // Характеристики контактного трения
    let ks = 0.25
    let kl = 0.35
    let etta = 0.0000001
    let dzetta = 0.000002
    let f = params.f
    let af = params.af
    let fup = f
    let tauup
    let f0on
    let f0ot

    // Кинематические параметры процесса прокатки
    let Vb
    let V1 = params.V1
    let Son
    let kon

    // Силовые характеристики процесса прокатки
    let Sigma0 = params.Sigma0
    let Sigma1 = params.Sigma1
    let Ppr
    let Мpr
    let Npr
    let psrup
    let psr
    let Sigma1p

    // Объявление массивов данных
    let x1 = []
    let x2 = []
    let hx1 = []
    let hx2 = []
    let ex1 = []
    let ex2 = []
    let Dvakx1 = []
    let Dvakx2 = []
    let Vx1 = []
    let Vx2 = []
    let Sigmax1 = []
    let Sigmax2 = []
    let px1 = []
    let px2 = []
    let taux1 = []
    let taux2 = []
    let Tgalfax2 = []
    let Sigmakx1 = []
    let Sigmakx2 = []
    let taukx1 = []
    let taukx2 = []
    let Vskx1 = []
    let Vskx2 = []
    let psrx = []
    let xot = []
    let tausrx = []
    let summa = []
    let es1 = []
    let es2 = []
    let fx1 = []
    let fx2 = []
    let ax = []
    let ax2 = []
    let Votskx1 = []
    let Votskx2 = []


    // Первое приближение длины зоны пластического формоизменения
    Lc = Math.sqrt(R0 * (h0 - h1))
    Lpl = Lc

    // Первое приближение длины зоны опережения очага деформации

    Slmin = 0
    Slmax = 1

    while ((((Slmax - Slmin) / Slmax) * 100) >= e) {

        Sl = 0.5 * (Slmin + Slmax)
        Lon = Sl * Lpl

        // Организация итерационного цикла по уточнению длины дуги контакта металла с валками

        do {

            // Шаг разбиения зоны пластического формоизменения
            dx = Lpl / n

            // Цикл по расчету локальных и интегральных характеристик напряженно-деформированного состояния
            for (let i = 1; i <= n; i++) {
                
                // Абсолютная геометрическая координата
                if (i === 1) {
                    x1[i] = Lpl
                    x2[i] = Lpl - dx
                } else {
                    x1[i] = Lpl - (i - 1) * dx
                    x2[i] = Lpl - i * dx
                }

                // Относительная геометрическая координата
                xot[i] = x2[i] / Lpl

                // Толщина полосы в очаге деформации
                hx1[i] = h1 + (h0 - h1) * ((x1[i] / Lpl) ** ah)
                hx2[i] = h1 + (h0 - h1) * ((x2[i] / Lpl) ** ah)

                // Толщина полосы в нейтральном сечении опережение коэффициент опережения окружная скорость валков

                hn = h1 + (h0 - h1) * ((Lon / Lpl) ** ah)
                Son = ((hn / h1) - 1) * 100
                kon = hn / h1
                Vb = V1 / kon

                // Скорость металла в очаге деформации

                Vx1[i] = V1 * h1 / hx1[i]
                Vx2[i] = V1 * h1 / hx2[i]

                // Скорость скольжения металла относительно валков

                if (hx1[i] <= h0 && hx1[i] >= hn && hx2[i] <= h0 && hx2[i] >= hn) {
                    Vskx1[i] = Math.abs(Vb - Vx1[i])
                    Vskx2[i] = Math.abs(Vb - Vx2[i])
                    Votskx1[i] = (h0 / (h0 - hn)) * (1 - (hn / hx1[i]))
                    Votskx2[i] = (h0 / (h0 - hn)) * (1 - (hn / hx2[i]))
                } else {
                    Vskx1[i] = Math.abs(Vx1[i] - Vb)
                    Vskx2[i] = Math.abs(Vx2[i] - Vb)
                    Votskx1[i] = (hn / (hn - h1)) * ((hn / hx1[i]) - 1)
                    Votskx2[i] = (hn / (hn - h1)) * ((hn / hx2[i]) - 1)
                }

                // Тангенс угла контакта металла с валками

                Tgalfax2[i] = 0.5 * (hx1[i] - hx2[i]) / dx

                // Интенсивность деформации в зоне пластического формоизменения

                ex1[i] = (2 / Math.sqrt(3)) * Math.log(Hp / hx1[i])
                ex2[i] = (2 / Math.sqrt(3)) * Math.log(Hp / hx2[i])

                // Суммарное относительное обжатие металла

                es1[i] = (Hp - hx1[i]) / Hp
                es2[i] = (Hp - hx2[i]) / Hp

                // Удвоенное сопротивление сдвигу (усредненное по высоте сечения)

                Dvakx1[i] = (2 / Math.sqrt(3)) * (Sigmat0 + a1 * es1[i] + a2 * (es1[i] ** 2) + a3 * (es1[i] ** 3))
                Dvakx2[i] = (2 / Math.sqrt(3)) * (Sigmat0 + a1 * es2[i] + a2 * (es2[i] ** 2) + a3 * (es2[i] ** 3))

                // Напряжение переднего натяжения

                ec = (Hp - h1) / Hp
                Sigmat = (Sigmat0 + a1 * ec + a2 * (ec ** 2) + a3 * (ec ** 3))

                // Сопротивление деформации в поверхностном слое

                Sigmakx1[i] = 0.5 * ((Math.sqrt(3) / 2) * Dvakx1[i] + Sigmamax)
                Sigmakx2[i] = 0.5 * ((Math.sqrt(3) / 2) * Dvakx2[i] + Sigmamax)

                // Сопротивление сдвигу в поверхностном слое

                taukx1[i] = (1 / Math.sqrt(3)) * Sigmakx1[i]
                taukx2[i] = (1 / Math.sqrt(3)) * Sigmakx2[i]

                // Коэффициент контактного трения

                f0ot = f * (1 + af)
                f0on = 1.2 * f * (1 + af)

                if (x1[i] <= Lpl && x1[i] >= Lon && x2[i] <= Lpl && x2[i] >= Lon) {
                    fx1[i] = f0ot * ((Math.abs(x1[i] - Lon) / (Lpl - Lon)) ** af)
                    fx2[i] = f0ot * ((Math.abs(x2[i] - Lon) / (Lpl - Lon)) ** af)
                } else {
                    fx1[i] = -f0on * ((Math.abs(Lon - x1[i]) / Lon) ** af)
                    fx2[i] = -f0on * ((Math.abs(Lon - x2[i]) / Lon) ** af)
                }

                // Ускорение частиц деформируемого металла в очаге деформации

                ax[i] = ((Vx2[i] ** 2) - (Vx1[i] ** 2)) / (2 * dx)

                // Угол контакта элементарного объема с валками

                ax2[i] = (hx1[i] - hx2[i]) / (2 * dx)

                // Организация рекуррентной схемы решения конечно-разностной формы уравнения стато-динамического равновесия

                if (i === 1) {
                    px1[i] = 0

                    Sigmax1[i] = -Sigma0

                    px2[i] = (Sigmax1[i] * hx1[i] + Dvakx2[i] * hx2[i] + px1[i] * dx * (fx1[i] - ax2[i]) - 0.25 * rm * (hx1[i] + hx2[i]) * ((Vx2[i] ** 2) - (Vx1[i] ** 2))) / (hx2[i] + dx * (ax2[i] - fx2[i]))

                    Sigmax2[i] = px2[i] - Dvakx2[i]

                    taux1[i] = fx1[i] * px1[i]
                    taux2[i] = fx2[i] * px2[i]
                } else {

                    px1[i] = px2[i - 1]
                    Sigmax1[i] = Sigmax2[i - 1]

                    px2[i] = (Sigmax1[i] * hx1[i] + Dvakx2[i] * hx2[i] + px1[i] * dx * (fx1[i] - ax2[i]) - 0.25 * rm * (hx1[i] + hx2[i]) * ((Vx2[i] ** 2) - (Vx1[i] ** 2))) / (hx2[i] + dx * (ax2[i] - fx2[i]))

                    Sigmax2[i] = px2[i] - Dvakx2[i]

                    taux1[i] = fx1[i] * px1[i]
                    taux2[i] = fx2[i] * px2[i]
                }
            }

            // Упрогое восстановление полосы

            dh1 = px2[n] * h1 / En

            // Радиус упруго деформированного рабочего валка

            Rd = (Lpl ** 2) / (h0 - h1)

            // Протяженность зоны упругого восстановления

            Lup = Math.sqrt(Rd * dh1)

            // Определение силы прокатки
            // Среднее на участке упругого восстановления давление

            psrup = (2 / 3) * px2[n]

            // Площадь эпюры давления металла на валки на участке длиной dx

            for (let i = 1; i <= n; i++) {
                psrx[i] = 0.5 * (px1[i] + px2[i]) * dx
            }

            // Площадь эпюры давления металла на валки в зоне пластического формоизменения

            symmap = 0

            for (let i = 1; i <= psrx.length - 1; i++) {
                symmap += psrx[i]
                summa[i] = symmap
            }

            // Окончательный расчет силы прокатки

            Ppr = (symmap + psrup * Lup) * b

            // Определение среднего давления металла на валки

            psr = Ppr / (b * (Lpl + Lup))

            // Определение длины упруго-пластического контакта (с учетом несимметричности эпюры контактных нормальных напряжений

            L1 = 8 * R0 * psr * (1 - wb ** 2) / (3.14 * Eb)
            Lplc = Math.sqrt(R0 * (h0 - h1) + (L1 ** 2)) + L1
            
            // Процент несоответствия заданной и рассчитанной длин дуг контакта металла с валками

            Delta = (Math.abs(Lplc - Lpl) / Lpl) * 100

            if (Delta >= 0.001) {
                Lpl = Lplc
            }
        } while (Delta >= 0.001)


        // Определение момента прокатки
        // Площадь эпюры контактных касательных напряжений на участке длиной dx

        for (let i = 1; i <= n; i++) {
            tausrx[i] = 0.5 * (taux1[i] + taux2[i]) * dx
        }

        // Среднее контактное касательное напряжение на упругом участке

        tauup = fup * psrup

        // Площадь эпюры контактных касательных напряжений на участке пластического формоизменения

        symmam = 0

        for (let i = 1; i <= tausrx.length - 1; i++) {
            symmam = symmam + tausrx[i]
        }

        // Окончательный расчет момента прокатки

        Мpr = 2 * 1000 * (symmam - tauup * Lup) * R0 * b

        // Расчетное определение мощности прокатки

        Npr = Мpr * Vb / R0

        // Расчетное напряжение переднего натяжения (должно быть равно заданному)

        Sigma1p = (-Sigmax2[n] * h1 - (2 * px2[n] / 3) * dh1 + 2 * tauup * Lup) / h1

        // Организация итерации по расчету длины зоны опережения

        if (Sigma1p - Sigma1 < 0) {
            Slmin = Sl
        } else {
            Slmax = Sl
        }
    }

    // Запись результатов расчета
    let roundedX = []
    let roundedDvakx = []
    let roundedSigmax = []
    let roundedPx = []
    let roundedTaux = []

    for (let i = 1; i <= n; i++){
        roundedX[i] = Math.round10(x2[i], -5)
        roundedDvakx[i] = Math.round10(Dvakx2[i], -5)
        roundedSigmax[i] = Math.round10(Sigmax2[i], -5)
        roundedPx[i] = Math.round10(px2[i], -5)
        roundedTaux[i] = Math.round10(taux2[i], -5)

        result += roundedX[i] + '\t' + roundedDvakx[i] + '\t' + roundedSigmax[i] + '\t' + roundedPx[i] + '\t' + roundedTaux[i] + '\n'
    }

    return {
        data: {
            x2: roundedX,
            Dvakx2: roundedDvakx,
            Sigmax2: roundedSigmax,
            px2: roundedPx,
            taux2: roundedTaux
        },
        params: {
            lenOfPlasticDef: Math.round10(1000 * Lplc, -5),
            sumOfLenDef: Math.round10(1000 * (Lplc + Lup), -5),
            anticipation: Math.round10(Son, -5),
            speedOfWorkingRolls: Math.round10(Vb, -5),
            mediumPressure: Math.round10(psr, -5),
            rollingForce: Math.round10(1000 * Ppr, -5),
            rollingMoment: Math.round10(Мpr, -5),
            rollingCapacity: Math.round10(Npr, -5),
            setedVoltage: Math.round10(Sigma1, -5),
            calculatedVoltage: Math.round10(Sigma1p, -5),
            percentageOfDiscrepancy: Math.round10(100 * Math.abs(Math.log(Sigma1 / Sigma1p)), -5),
            mistake: Math.round10(Delta, -5)
        },
        array: result
    }
} 