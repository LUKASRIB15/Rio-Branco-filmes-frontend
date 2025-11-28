import { IconTrash } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const deleteProfileFormValidationSchema = z.object({
  confirmRemoval: z.string()
})

type DeleteProfileFormData = z.infer<typeof deleteProfileFormValidationSchema>

export function DeleteProfile(){
  const {handleSubmit, register, watch} = useForm<DeleteProfileFormData>({
    resolver: zodResolver(deleteProfileFormValidationSchema)
  })

  const isInvalidDeleteProfile = watch('confirmRemoval') !== "CONFIRMAR"

  function handleDeleteProfile(data: DeleteProfileFormData){
    console.log(data)
  }

  return(
    <Dialog>
      <form onSubmit={handleSubmit(handleDeleteProfile)}>
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
            <Button type="submit" disabled={isInvalidDeleteProfile}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}