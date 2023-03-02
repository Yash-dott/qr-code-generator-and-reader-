let user_choice = document.querySelectorAll(".choice")
let make_choice = document.querySelector(".select_choice")
let generate_qr_container = document.querySelector(".generate_qr_container")
let read_qr_container = document.querySelector(".scan_qr_code_container")
let api_user_input
let api_url

// select_task
user_choice.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (choice.id === "generate") {
            make_choice.style.display = `${"none"}`
            generate_qr_container.style.display = `${"block"}`
            generate_qr();
        } else {
            make_choice.style.display = `${"none"}`
            read_qr_container.style.display = `${"block"}`
            read_qr();
        }
    })
})

// generate_qr
generate_qr = () => {
    let user_api_input = document.getElementById("user_input")
    let generate_qr_btn = document.getElementById("generate_qr")


    user_api_input.addEventListener("input", () => {
        api_user_input = user_api_input.value
    })
    generate_qr_btn.addEventListener("click", () => {
        api_url = `https://api.qrserver.com/v1/create-qr-code/?data=${api_user_input}&size=100x100`
        generate_getdata();
    })
}


generate_getdata = () => {

    fetch(api_url, {
            method: "GET"
        })
        .then((response) => {
            return response;
        })
        .then((data) => {
            change_data(data);
        })
}

change_data = (data) => {
    let generate_prev_img = document.getElementById("preview")
    let download_genrated_img = document.getElementById("download_generated_qr")
    generate_prev_img.src = `${data.url}`

    download_genrated_img.addEventListener("click", () => {
        let download_element = document.createElement("a")
        download_element.href = `${generate_prev_img.src}`
        download_element.setAttribute("download", "QR")
        download_element.click();
    })
}

// read_qr_code
read_qr = () => {
    let select_image_btn = document.getElementById("select_image_btn")
    let main_select_img_btn = document.getElementById("select_image")
    let read_prev_img = document.getElementById("result_img")

    select_image_btn.addEventListener("click", () => {
        main_select_img_btn.click();
    })

    main_select_img_btn.addEventListener("change",()=>{
        let fake_url = main_select_img_btn.files[0]
        let create_url = URL.createObjectURL(fake_url)
        read_prev_img.src = `${create_url}`
        let formdata = new FormData();
            formdata.append("file",fake_url)
        api_url = `https://api.qrserver.com/v1/read-qr-code/`
        read_getdata(formdata)
    })
}

read_getdata=(formdata)=>{
    
    fetch(api_url,{
        method: "POST", body: formdata
    })
    .then((responce)=>{
       return responce.json();
    })
    .then((data)=>{
        change_read_data(data)
    })
}

// change_data
change_read_data=(data)=>{
    let result_text = document.getElementById("result_text")
    let download_text_file = document.getElementById("download_file")
    result_text.value = `${data[0].symbol[0].data}`

    // create_text_file
    download_text_file.addEventListener("click",()=>{
        let blob = new Blob([result_text.value], {type: 'text/plain'})
        let blob_url = URL.createObjectURL(blob)
        let download_tag = document.createElement("a")
        download_tag.href = blob_url
        download_tag.setAttribute("download","QR_Code")
        download_tag.click();
    })
}

let connection_status = document.querySelector(".test_connection")
let wifi_img = document.getElementById("wifi_img")
let wifi_text = document.getElementById("wifi_text")
if (!navigator.onLine) {
    connection_status.style.display = `${"flex"}`
} else {
    connection_status.style.display = `${"flex"}`
    wifi_img.src = `${"assets/images/wifi-1.gif"}`
    wifi_text.innerText = `${"You are online"}`
}