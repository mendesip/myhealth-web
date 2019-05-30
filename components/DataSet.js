const ncds = ["Arterial hypertension", "Coronary artery disease", "Diabetes", "Obesity"];
const cardiacFields = ['weight', 'systolic', 'diastolic', 'heart_beats'];
const glycemicFields = ['weight', 'glycemic_rate'];
const obesityFields = ['weight', 'bodyfat'];

const borderColors = {
    weight:  'rgba(255, 96, 128, 1)',
    systolic: 'rgba(255, 64, 0, 1)',
    diastolic: 'rgba(0, 128, 255, 1)',
    heartBeats: 'rgba(0, 0, 128, 1)',
    glycemicRate: 'rgba(0, 255, 128, 1)',
    bodyfat: 'rgba(255, 255, 32, 1)'
};


const backgroundColors = {
    weight:  'rgba(255, 96, 128, 0.2)',
    systolic: 'rgba(255, 64, 0, 0.2)',
    diastolic: 'rgba(0, 128, 255, 0.2)',
    heartBeats: 'rgba(0, 0, 128, 0.2)',
    glycemicRate: 'rgba(0, 255, 128, 0.2)',
    bodyfat: 'rgba(255, 255, 32, 0.2)'
};

export default class DataSet{
    constructor(ncd, registers, filters){
        this.ncd = ncd;
        this.registers = new Map();

        //Filtragem por ncd
        let validRegisters = [];
        registers.forEach(register => {
            if(register.ncd_id === ncd)
                validRegisters.push(register);
        });

        //Formatação dos campos
        validRegisters.forEach(register =>{
            let d = new Date(Date.parse(register.timestamp));
            if(d >= filters.startDate && d <= filters.endDate) {
                let date = d.getDate() + '/' + d.getMonth()+1 + '/' + d.getFullYear();
                if (this.registers.get(date) === undefined) {
                    let registerByDate = [];
                    registerByDate.push(formatRegister(register, d, ncd));
                    this.registers.set(date, registerByDate);
                } else {
                    let registerByDate = this.registers.get(date);
                    registerByDate.push(formatRegister(register, d, ncd));
                }
            }
        });


    }
    toChartData = (filters) => {
        let labels = [...this.registers.keys()];
        let datas = [...this.registers.values()];
        let datasets = new Map();

        if(filters === undefined){
            return datas;
        }

        for (let data in datas) {
            for (let field in datas[data][0]) {
                if (filters[field] !== true) continue;
                let values = [];
                if (datasets.get(field) === undefined) {
                    datasets.set(field, values);
                } else {
                    values = datasets.get(field);
                }
                values.push(datas[data][0][field]);
            }
        }

        let formatedDataset = [];
        datasets.forEach((value, key) => {
            formatedDataset.push({
                label: key,
                data: value,
                fill: false,
                backgroundColor: backgroundColors[key],
                borderColor: borderColors[key],
                borderWidth: 1
            })
        });

        console.log(labels);
        console.log(formatedDataset);

        return {
            labels: labels,
            datasets: formatedDataset
        };
    }
}

function formatRegister(register, date, ncd){
    let formated = {
        hour: String(date.getHours()).padStart(2,'0') + ':' + String(date.getMinutes()).padStart(2,'0'),
        observation: register.observation
    };

    switch (ncd) {
        case 0:
        case 1:
            formated.heartBeats = register.heart_beats;
            formated.weight = register.weight;
            formated.systolic = register.systolic;
            formated.diastolic = register.diastolic;
            break;
        case 2:
            formated.glycemicRate = register.glycemic_rate;
            formated.weight = register.weight;
            break;
        case 3:
            formated.bodyfat = register.bodyfat;
            formated.weight = register.weight;
            break;
    }
    return formated;
}