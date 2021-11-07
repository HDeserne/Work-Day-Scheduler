const date = new Date();
var hour = date.getHours();


setInterval(function () {
    const date = new Date();
    
    const month = date.getMonth() + 1;
    
    const day = date.getDate();
    
    const year = date.getFullYear();
    
    var hour = date.getHours();
    if (hour > 12) { hour -= 12 }
    
    var minutes = date.getMinutes();
    if (minutes < 10) { minutes = `0` + `${minutes}` }
    
    var seconds = date.getSeconds();
    if (seconds < 10) { seconds = `0` + `${seconds}` }

    const formattedTime = `${month}/${day}/${year} ${hour}:${minutes}:${seconds}`;
    $("#currentDay").text(formattedTime);
}, 1000);


var plannerArray = []



$(".time-block").each(function () {
    var timehr = $(this).attr("data-num")

    if (`${timehr}` == hour) { $(`#hour-${timehr}`).find("textarea").addClass("bg-warning text-white") }
    else if (hour < timehr) { $(`#hour-${timehr}`).find("textarea").addClass("bg-success text-white") }
    else { $("textarea").addClass("bg-secondary text-white") }
    console.log(`${timehr} < ${hour}`)

    $(this).find(".btn").on("click", function (e) {
        e.preventDefault
        
        if (JSON.parse(localStorage.getItem("plannerArray")) !== null) {
            plannerArray = JSON.parse(localStorage.getItem("plannerArray"))
        }

        var plansText = $(`#hour-${timehr}`).find("textarea").val()
        plannerArray[`${timehr - 9}`].plans = plansText
        { localStorage.setItem("plannerArray", JSON.stringify(plannerArray)) }

    })

    var planner = {
        time: timehr,
        plans: $(this).find("textarea").val()
    }

    plannerArray.push(planner)

})


function savedPlans() {

    let plannerArray = JSON.parse(localStorage.getItem("plannerArray"))

    if (plannerArray === null) { return }

    for (let i = 0; i < plannerArray.length; i++) {
        $("#hour-" + [i + 9]).find("textarea").text(plannerArray[i].plans)

    }

}

savedPlans()