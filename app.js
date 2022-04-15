const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoa2xzd2ttaXdhY3RieHJ5d3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4Njc3NTUsImV4cCI6MTk2NTQ0Mzc1NX0.s7X92Rf7zrlrd6QmMLXO3l0tW8GSdRYbnCeqhfRc_Bo";
const url = "https://vhklswkmiwactbxrywqr.supabase.co";
const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let activity = document.querySelector("#activity").value;
    save.innerText = "Saveing....";
    save.setAttribute("disabled", true);
    let res = await database.from("list").insert({
        activity: activity,
    })
    if (res) {
        save.innerText = "Save"
        save.setAttribute("disabled", false);
        activity = "";
        getActivity();
        getTotalCount();
        window.location.reload();


    } else {
        alert("failed to add")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
    }
})

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await database.from("list").select("*", { count: "exact" });
    total.innerText = res.data.length;
}

getTotalCount();

const getActivity = async () => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");
    let tr = "";
    loading.innerText = "Get Data ..."
    const res = await database.from("list").select("*");
    if (res) {
        for (var i in res.data) {
            tr += `<tr>
         <td>${parseInt(i) + 1}</td>
         <td>${res.data[i].activity}</td>
         <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editActivity(${res.data[i].id})' data-bs-target="#editModel">Edit</button></td>
         <td><button onclick='deleteActivity(${res.data[i].id})' class="btn btn-danger">Delete</button></td>
         </tr>`;
        }
        tbody.innerHTML = tr;
        loading.innerText = ""

    }

}

getActivity();

const editActivity = async (id) => {


    const res = await database.from("list").select("*").eq("id", id);
    if (res) {
        document.getElementById("id").value = res.data[0].id;
        document.getElementById("edit-activity").value = res.data[0].activity;
    }
}

const update = document.getElementById("update");

update.addEventListener("click", async () => {
    let id = document.getElementById("id").value;
    let activity = document.getElementById("edit-activity").value;
    update.innerText = "Updateing...."
    update.setAttribute("disabled", true);
    const res = await database.from("list").update({
        activity
    }).eq("id", id)

    if (res) {
        update.innerText = "Update"
        update.setAttribute("disabled", false);
        activity = "";
        getActivity();
        getTotalCount();
        window.location.reload();

    } else {
        alert("Failed to update")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
    }
})

const deleteActivity = async (id) => {
    const res = await database.from("list").delete().eq("id", id)

    if (res) {
        getActivity();
        getTotalCount();

    } else {
        alert("Failed to delete")
    }
}

