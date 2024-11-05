export class FileService {
    download(content: string, fileName: string, contentType: string) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    
    async upload(file:File): Promise<any>{
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
    
    async handleUpload(event: Event): Promise<any>{
        const input: HTMLInputElement|null = event.target as HTMLInputElement;
        if(!input){
            throw Error("File input not found");
        }
        const files:FileList|null = input.files;
        if(files && (files.length??0)>0){
            return await this.upload(files[0]);
        }
    }
}
