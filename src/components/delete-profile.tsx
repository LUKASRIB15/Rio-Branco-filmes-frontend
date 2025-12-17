import { IconTrash } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/contexts/sessions";
import { AxiosError } from "axios";
import { useTransition } from "react";

const deleteProfileFormValidationSchema = z.object({
  confirmRemoval: z.string()
})

type DeleteProfileFormData = z.infer<typeof deleteProfileFormValidationSchema>

export function DeleteProfile(){
  const {handleSubmit, register, watch} = useForm<DeleteProfileFormData>({
    resolver: zodResolver(deleteProfileFormValidationSchema)
  })
  const [isLoading, startLoading] = useTransition()

  const {deleteUserAccount} = useSession()

  const isInvalidDeleteProfile = watch('confirmRemoval') !== "CONFIRMAR"

  async function handleDeleteProfile(data: DeleteProfileFormData){
    startLoading(async ()=>{
      try{
        if(data.confirmRemoval === 'CONFIRMAR'){
          await deleteUserAccount()
        }
      }catch(error){
        if(error instanceof AxiosError){
          switch(error.status){
            case 401:
              alert("Você não tem permissão para deletar esse perfil.")
              break;
            default:
              alert("Ocorreu um erro ao deletar seu perfil. Tente novamente mais tarde.")
          }
        }
      }
    })
  }

  return(
    <Dialog>
        <DialogTrigger asChild>
          <Button className="text-destructive" variant={"secondary"}>
            <IconTrash />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        
          <DialogHeader>
            <DialogTitle>Remover meu Perfil</DialogTitle>
            <DialogDescription>
              Você pode excluir permanentemente o seu perfil aqui. Depois de confirmar, todas as suas informações serão removidas e essa ação não poderá ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="delete">Digite "CONFIRMAR" para deletar sua conta</Label>
              <Input id="delete" {...register('confirmRemoval')}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit(handleDeleteProfile)} disabled={isInvalidDeleteProfile}>
              {
                isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
                  </div>
                ):(
                  'Deletar'
                )
              }
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}