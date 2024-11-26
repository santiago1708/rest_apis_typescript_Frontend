import { Product } from "../types"
import { Form, useNavigate, redirect, ActionFunctionArgs, useFetcher } from 'react-router-dom'
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function Action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">

                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 uppercase text-xs w-full font-bold border border-black cursor-pointer`}
                    >
                        {isAvailable ? "Disponible" : "No disponible"}
                    </button>
                </fetcher.Form>

            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`products/${product.id}/edit`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >Editar</button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm('¿Eliminar?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value='Eliminar'
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
