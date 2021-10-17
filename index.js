let studentsArray = [
    {
        surname: 'Иванов',
        name: 'Владислав',
        middleName: 'Юрьевич',
        faculty: 'Управление качеством',
        birthday: '03.09.1995',
        age: 26,
        startOfStudy: 2015
    },
    {
        surname: 'Иванов',
        name: 'Владислав',
        middleName: 'Юрьевич',
        faculty: 'Архитектура',
        birthday: '03.09.1995',
        age: 26,
        startOfStudy: 2015
    },
    {
        surname: 'Ушаков',
        name: 'Дмитрий',
        middleName: 'Андреевич',
        faculty: 'Управление качеством',
        birthday: '04.10.1997',
        age: 26,
        startOfStudy: 2016
    },
    {
        surname: 'Шабанова',
        name: 'Анастасия',
        middleName: 'Викторовна',
        faculty: 'Землеустройсво и кадастры',
        birthday: '02.09.1997',
        age: 24,
        startOfStudy: 2015
    },
    {
        surname: 'Шабанов',
        name: 'Даниил',
        middleName: 'Викторович',
        faculty: 'Кулинария',
        birthday: '07.01.2003',
        age: 18,
        startOfStudy: 2017
    },
    {
        surname: 'Иванова',
        name: 'Надежда',
        middleName: 'Михайловна',
        faculty: 'Экономика',
        birthday: '17.03.1975',
        age: 46,
        startOfStudy: 1993
    }
]

let form = document.createElement('form')
let title = document.createElement('h2')
title.textContent = 'Добавить студента'
let inputForSurname = document.createElement('input')
let inputForName = document.createElement('input')
let inputForMiddleName = document.createElement('input')
let inputForFaculty = document.createElement('input')
let dateBirthday = document.createElement('input')
let study = document.createElement('input')
let btn = document.createElement('button')
let tbody = document.querySelector('tbody')
let searchForm = document.createElement('form')
searchForm.classList.add('searchForm')
let td1 = document.querySelector('.td1')
let td2 = document.querySelector('.td2')
let td3 = document.querySelector('.td3')
let td4 = document.querySelector('.td4')

let sortType = ''
let sortDirection = ''

let searchStudent = document.createElement('input')
let searchByFaculty = document.createElement('input')
let searchByBirthday = document.createElement('input')
searchByBirthday.type = 'date'
let searchByStartOfStudy = document.createElement('input')
searchByStartOfStudy.type = 'number'
searchByStartOfStudy.min = '2000'
let searchTitle = document.createElement('h2')
searchTitle.textContent = 'Поиск студента'
searchStudent.placeholder = 'Введите ФИО студента'
searchByFaculty.placeholder = 'Введите факультет студента'
searchByBirthday.placeholder = 'Введите дату рождения студента'
searchByStartOfStudy.placeholder = 'Введите год зачисления студента'
searchForm.append(searchTitle)
searchForm.append(searchStudent)
searchForm.append(searchByFaculty)
searchForm.append(searchByBirthday)
searchForm.append(searchByStartOfStudy)

inputForSurname.required = 'true'
inputForName.required = 'true'
inputForMiddleName.required = 'true'
inputForFaculty.required = 'true'
dateBirthday.required = 'true'
study.required = 'true'

inputForSurname.placeholder = 'Введите фамилию'
inputForName.placeholder = 'Введите имя'
inputForMiddleName.placeholder = 'Введите отчество'
inputForFaculty.placeholder = 'Введите факультет'
study.placeholder = 'Введите год начала обучения'
dateBirthday.type = 'date'
dateBirthday.min = '1990-01-01'
study.type = 'number'
study.min = '2000'
btn.type = 'submit'
btn.textContent ='Добавить студента'
form.append(title)
form.append(inputForSurname)
form.append(inputForName)
form.append(inputForMiddleName)
form.append(inputForFaculty)
form.append(dateBirthday)
form.append(study)
form.append(btn)
document.body.prepend(searchForm)
document.body.append(form)

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    createInfoAboutStudent()
    function createInfoAboutStudent() {
        let surname = inputForSurname.value
        let name = inputForName.value
        let middleName = inputForMiddleName.value
        let faculty = inputForFaculty.value

        return {
            surname: surname,
            name: name,
            middleName: middleName,
            faculty: faculty
        }
    }

    createAge()
    function createAge(){
        let arrayOfBirthday = dateBirthday.value.split('-').reverse()
        let birthday = arrayOfBirthday.join('.')

        const [day, month, year] = arrayOfBirthday
        let birthDate = {day, month, year}

        let birth = new Date (dateBirthday.value)
        let today = new Date()
        let age
        if (today.getMonth() > birth.getMonth()) {
            age = today.getFullYear() - birth.getFullYear()
        } else {
            if (today.getMonth() == birth.getMonth() && today.getDate() >= birth.getDate()) {
                age = today.getFullYear() - birth.getFullYear()
            }   else {
                    age = today.getFullYear() - birth.getFullYear() - 1
            }
        }
        if (age < 0) age = 0

        return {
            birthday: birthday,
            age: age,
        }
    }

    createDurationOfStudy()
    function createDurationOfStudy(){
        let startOfStudy = study.value

        return {
            startOfStudy: startOfStudy
        }
    }

    studentsArray.push({
        surname: createInfoAboutStudent().surname,
        name: createInfoAboutStudent().name,
        middleName: createInfoAboutStudent().middleName,
        faculty: createInfoAboutStudent().faculty,
        birthday: createAge().birthday,
        age: createAge().age,
        startOfStudy: createDurationOfStudy().startOfStudy
    })

    inputForSurname.value = ''
    inputForName.value = ''
    inputForMiddleName.value = ''
    inputForFaculty.value = ''
    dateBirthday.value = ''
    study.value = ''

    renderTable(sortArr(studentsArray, 'fullName', true))
})

function createStudentTr(student) {
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let td4 = document.createElement('td')
    let endOfStudy = (Number(student.startOfStudy) + 4)
    let thisYear = new Date()
    let year = thisYear.getFullYear() - student.startOfStudy
    let curses = ['1 курс', '2 курс', '3 курс', '4 курс']
    let grade
    if (year > 3) {
        grade = 'Закончил'
    } else {
        if (year < 0) {
            grade = 'Обучение не началось'
        } else {
            grade = curses[year]
        }
    }

    td1.textContent = fullName(student)
    td2.textContent = student.faculty
    td3.textContent = student.birthday + ' (' + student.age  + ' лет)'
    td4.textContent = student.startOfStudy + ' - ' + endOfStudy + ' (' + grade + ')'

    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)
    return tr
}

function renderTable(studentsArray) {
    tbody.innerHTML = ''

    let renderArray = [...studentsArray]
    renderArray = filterArr(renderArray)

    for (const item of renderArray) {
        let newTr = createStudentTr(item)
        tbody.append(newTr)
    }
}

function fullName(student){
    return student.surname + ' ' + student.name + ' ' + student.middleName
}

function sortArr (arr, prop = 'fullName', direction = true) {
    let newArr = [...arr]
    let result

    newArr.sort(function (a, b){
        if (prop == 'fullName') result = fullName(a) > fullName(b) ? 1 : -1
        if (prop == 'faculty') result = a.faculty > b.faculty ? 1 : -1
        if (prop == 'birthday') result = a.birthday > b.birthday ? 1 : -1
        if (prop == 'startOfStudy') result = a.startOfStudy > b.startOfStudy ? 1 : -1
        if (!direction) result = result > 0 ? -1 : 1
        return result
    })
    return newArr
}

renderTable(studentsArray)


function filterArr(arr){
    let newArr = [...arr]

    let filtered = newArr.filter(x => {
        if (!searchByBirthday.value && !searchByStartOfStudy.value) {
            return fullName(x).includes(searchStudent.value) && x.faculty.includes(searchByFaculty.value)
        } else if (searchByBirthday.value && !searchByStartOfStudy.value) {
            return fullName(x).includes(searchStudent.value) && x.faculty.includes(searchByFaculty.value) && x.birthday == searchByBirthday.value.split('-').reverse().join('.')
        } else if (searchByBirthday.value && searchByStartOfStudy.value) {
            return fullName(x).includes(searchStudent.value) && x.faculty.includes(searchByFaculty.value) && x.birthday == searchByBirthday.value.split('-').reverse().join('.') && x.startOfStudy == searchByStartOfStudy.value
        } else if (!searchByBirthday.value && searchByStartOfStudy.value) {
            return fullName(x).includes(searchStudent.value) && x.faculty.includes(searchByFaculty.value) && x.startOfStudy == searchByStartOfStudy.value
        }
    })

    return filtered
}

function clickOnTd(td) {
    td.addEventListener('click', ()=>{
        if (td == td1) renderTable(sortArr(studentsArray, 'fullName', sortDirection))
        if (td == td2) renderTable(sortArr(studentsArray, 'faculty', sortDirection))
        if (td == td3) renderTable(sortArr(studentsArray, 'birthday', sortDirection))
        if (td == td4) renderTable(sortArr(studentsArray, 'startOfStudy', sortDirection))
        sortDirection = !sortDirection
    })

}
clickOnTd(td1)
clickOnTd(td2)
clickOnTd(td3)
clickOnTd(td4)

searchForm.addEventListener('input', ()=>{
    renderTable(studentsArray)
})
