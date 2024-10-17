export function download(content: string, fileName: string, contentType: string) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
export async function upload(file:File){
    return new Promise((resolve, reject)=>{
        if (file) {
            var fr = new FileReader();
            fr.onload = function(e) { 
                if(!e.target?.result){
                    reject("File content is null");
                }
                resolve(e.target?.result);
            }
          
            fr.readAsText(file);
        }
    })
}