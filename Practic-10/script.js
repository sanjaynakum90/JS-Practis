function showItem() {
    show.innerHTML = ""
    arr.map((ele) => {
        const card = `
                    <div class="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:shadow-2xl hover:-translate-y-2">
                        <div class="relative">
                            <button onclick="del(${ele.id})" 
                                class="absolute right-3 top-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform transition-all hover:scale-110">
                                <i class="ri-delete-bin-5-line"></i>
                            </button>
                            <img src="${ele.img}" class="h-48 w-full object-cover" alt="${ele.name}">
                        </div>
                        <div class="p-5">
                            <h5 class="text-xl font-bold text-gray-800 mb-2">${ele.name}</h5>
                            <p class="text-blue-600 font-bold text-lg mb-2">$${ele.price}</p>
                            <p class="text-gray-600 mb-4">${ele.rate}</p>
                            <div class="flex justify-between gap-2">
                                <button onclick="edit(${ele.id})" 
                                    class="flex items-center px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                    <i class="ri-edit-2-line mr-1"></i>Edit
                                </button>
                                <button 
                                    class="flex items-center px-4 py-2 border-2 border-gray-600 text-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition-all">
                                    <i class="ri-information-line mr-1"></i>Details
                                </button>
                            </div>
                        </div>
                    </div>
                `
        show.innerHTML += card
    })
}
