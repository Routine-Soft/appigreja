// 'use client';

// import { useEffect, useState } from 'react';
// import { CelulaService } from '@/service/celula/CelulaService';
// import {
//     CelulaResponseDTO,
//     UpdateCelulaDTO,
// } from '@/dto/celula/celulaDTO';

// interface CelulasListProps {
//     onCreate?: () => void;
// }

// export default function CelulasList({ onCreate }: CelulasListProps) {
//     const [celulas, setCelulas] = useState<CelulaResponseDTO[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const [editingId, setEditingId] = useState<string | null>(null);
//     const [editForm, setEditForm] = useState<UpdateCelulaDTO>({});

//     useEffect(() => {
//         fetchCelulas();
//     }, []);

//     const fetchCelulas = async () => {
//         try {
//             const data = await CelulaService.getAllCelulas();
//             setCelulas(data.celulas || []);
//         } catch (error) {
//             if (error instanceof Error) {
//                 setError(error.message || 'Erro ao carregar células');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (!confirm('Deseja realmente deletar esta célula?')) return;

//         try {
//             await CelulaService.deleteCelula({ _id: id });
//             setCelulas((prev) => prev.filter((c) => c._id !== id));
//         } catch (error) {
//             if (error instanceof Error) {
//                 alert(error.message || 'Erro ao deletar célula');
//             }
//         }
//     };

//     const handleEdit = (celula: CelulaResponseDTO) => {
//         setEditingId(celula._id);
//         setEditForm({
//             lideres: celula.lideres || [],
//             anfitrioes: celula.anfitrioes || [],
//             enderecos: celula.enderecos || [],
//             telefones: celula.telefones || [],
//         });
//     };

//     const handleSave = async (id: string) => {
//         try {
//             await CelulaService.updateCelula(
//                 { _id: id },
//                 {
//                     lideres: editForm.lideres?.length ? editForm.lideres : undefined,
//                     anfitrioes: editForm.anfitrioes?.length ? editForm.anfitrioes : undefined,
//                     enderecos: editForm.enderecos?.length ? editForm.enderecos : undefined,
//                     telefones: editForm.telefones?.length ? editForm.telefones : undefined,
//                 }
//             );

//             await fetchCelulas();
//             setEditingId(null);
//             setEditForm({});
//         } catch (error) {
//             if (error instanceof Error) {
//                 alert(error.message || 'Erro ao atualizar célula');
//             }
//         }
//     };

//     const handleCancel = () => {
//         setEditingId(null);
//         setEditForm({});
//     };

//     const renderEditableList = (
//         label: string,
//         field: keyof UpdateCelulaDTO
//     ) => (
//         <div className="space-y-2">
//             <div className="flex justify-between items-center">
//                 <strong>{label}</strong>
//                 <button
//                     type="button"
//                     onClick={() =>
//                         setEditForm({
//                             ...editForm,
//                             [field]: [...(editForm[field] || []), ''],
//                         })
//                     }
//                     className="text-sm bg-emerald-600 text-white px-2 py-1 rounded"
//                 >
//                     Adicionar
//                 </button>
//             </div>

//             {(editForm[field] || []).map((item: string, index: number) => (
//                 <div key={index} className="flex gap-2">
//                     <input
//                         type="text"
//                         value={item}
//                         onChange={(e) => {
//                             const next = [...(editForm[field] || [])];
//                             next[index] = e.target.value;
//                             setEditForm({ ...editForm, [field]: next });
//                         }}
//                         className="flex-1 border px-2 py-1 rounded"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => {
//                             const next = [...(editForm[field] || [])];
//                             next.splice(index, 1);
//                             setEditForm({ ...editForm, [field]: next });
//                         }}
//                         className="text-red-600"
//                     >
//                         Remover
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );

//     if (loading) {
//         return <div className="text-center py-8">Carregando células...</div>;
//     }

//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800">Células</h1>
//                     <p className="text-gray-600">Gerencie as células cadastradas</p>
//                 </div>

//                 {onCreate && (
//                     <button
//                         onClick={onCreate}
//                         className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
//                     >
//                         Criar Nova Célula
//                     </button>
//                 )}
//             </div>

//             {error && (
//                 <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
//                     {error}
//                 </div>
//             )}

//             {celulas.length === 0 ? (
//                 <div className="bg-white p-6 rounded shadow text-center">
//                     Nenhuma célula cadastrada.
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {celulas.map((celula) => (
//                         <div
//                             key={celula._id}
//                             className="bg-white rounded-lg shadow p-6 space-y-4"
//                         >
//                             {editingId === celula._id ? (
//                                 <>
//                                     {renderEditableList('Líderes *', 'lideres')}
//                                     {renderEditableList('Anfitriões', 'anfitrioes')}
//                                     {renderEditableList('Endereços', 'enderecos')}
//                                     {renderEditableList('Telefones', 'telefones')}

//                                     <div className="flex gap-2 pt-2">
//                                         <button
//                                             onClick={() => handleSave(celula._id)}
//                                             className="flex-1 bg-emerald-600 text-white py-2 rounded"
//                                         >
//                                             Salvar
//                                         </button>
//                                         <button
//                                             onClick={handleCancel}
//                                             className="flex-1 bg-gray-300 py-2 rounded"
//                                         >
//                                             Cancelar
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <div>
//                                         <strong>Líderes:</strong>
//                                         <ul className="list-disc list-inside">
//                                             {celula.lideres.map((l, i) => (
//                                                 <li key={i}>{l}</li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                                     {celula.anfitrioes?.length && (
//                                         <div>
//                                             <strong>Anfitriões:</strong>
//                                             <ul className="list-disc list-inside">
//                                                 {celula.anfitrioes.map((a, i) => (
//                                                     <li key={i}>{a}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}

//                                     {celula.enderecos?.length && (
//                                         <div>
//                                             <strong>Endereços:</strong>
//                                             <ul className="list-disc list-inside">
//                                                 {celula.enderecos.map((e, i) => (
//                                                     <li key={i}>{e}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}

//                                     {celula.telefones?.length && (
//                                         <div>
//                                             <strong>Telefones:</strong>
//                                             <ul className="list-disc list-inside">
//                                                 {celula.telefones.map((t, i) => (
//                                                     <li key={i}>{t}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}

//                                     <div className="flex gap-2 pt-4">
//                                         <button
//                                             onClick={() => handleEdit(celula)}
//                                             className="flex-1 bg-blue-600 text-white py-2 rounded"
//                                         >
//                                             Editar
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(celula._id)}
//                                             className="flex-1 bg-red-600 text-white py-2 rounded"
//                                         >
//                                             Deletar
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
