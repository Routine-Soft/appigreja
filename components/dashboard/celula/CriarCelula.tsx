// 'use client';

// import { useState } from 'react';
// import { CelulaService } from '@/service/celula/CelulaService';
// import { CreateCelulaDTO } from '@/dto/celula/celulaDTO';

// interface CriarCelulaProps {
//     onSuccess?: () => void;
// }

// export default function CriarCelula({ onSuccess }: CriarCelulaProps) {
//     const [lideres, setLideres] = useState<string[]>([]);
//     const [anfitrioes, setAnfitrioes] = useState<string[]>([]);
//     const [enderecos, setEnderecos] = useState<string[]>([]);
//     const [telefones, setTelefones] = useState<string[]>([]);

//     const [inputValue, setInputValue] = useState('');
//     const [currentField, setCurrentField] = useState<
//         'lideres' | 'anfitrioes' | 'enderecos' | 'telefones'
//     >('lideres');

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const addItem = () => {
//         if (!inputValue.trim()) return;

//         const setters = {
//             lideres: setLideres,
//             anfitrioes: setAnfitrioes,
//             enderecos: setEnderecos,
//             telefones: setTelefones,
//         };

//         const values = {
//             lideres,
//             anfitrioes,
//             enderecos,
//             telefones,
//         };

//         setters[currentField]([...values[currentField], inputValue.trim()]);
//         setInputValue('');
//     };

//     const removeItem = (field: typeof currentField, index: number) => {
//         const setters = {
//             lideres: setLideres,
//             anfitrioes: setAnfitrioes,
//             enderecos: setEnderecos,
//             telefones: setTelefones,
//         };

//         const values = {
//             lideres,
//             anfitrioes,
//             enderecos,
//             telefones,
//         };

//         setters[field](values[field].filter((_, i) => i !== index));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             if (lideres.length === 0) {
//                 setError('Informe pelo menos um líder');
//                 return;
//             }

//             const payload: CreateCelulaDTO = {
//                 lideres,
//                 anfitrioes: anfitrioes.length ? anfitrioes : undefined,
//                 enderecos: enderecos.length ? enderecos : undefined,
//                 telefones: telefones.length ? telefones : undefined,
//             };

//             await CelulaService.createCelula(payload);

//             setLideres([]);
//             setAnfitrioes([]);
//             setEnderecos([]);
//             setTelefones([]);

//             onSuccess ? onSuccess() : alert('Célula criada com sucesso!');
//         } catch (error) {
//             if (error instanceof Error) {
//                 setError(error.message);
//             } else {
//                 setError('Erro desconhecido ao criar célula');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const renderList = (title: string, field: typeof currentField, items: string[]) => (
//         <div className="space-y-2">
//             <h3 className="font-semibold">{title}</h3>
//             {items.map((item, index) => (
//                 <div key={index} className="flex justify-between bg-gray-100 p-2 rounded">
//                     <span>{item}</span>
//                     <button
//                         type="button"
//                         onClick={() => removeItem(field, index)}
//                         className="text-red-600"
//                     >
//                         Remover
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );

//     return (
//         <div className="max-w-3xl mx-auto space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Criar Nova Célula</h1>

//             {error && (
//                 <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
//                     {error}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg space-y-6">
//                 <div className="flex gap-2">
//                     <select
//                         value={currentField}
//                         onChange={(e) => setCurrentField(e.target.value as 'lideres' | 'anfitrioes' | 'enderecos' | 'telefones')}
//                         className="border px-3 py-2 rounded"
//                     >
//                         <option value="lideres">Líder</option>
//                         <option value="anfitrioes">Anfitrião</option>
//                         <option value="enderecos">Endereço</option>
//                         <option value="telefones">Telefone</option>
//                     </select>

//                     <input
//                         type="text"
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         className="flex-1 border px-3 py-2 rounded"
//                         placeholder="Digite e adicione"
//                     />

//                     <button
//                         type="button"
//                         onClick={addItem}
//                         className="bg-emerald-600 text-white px-4 rounded"
//                     >
//                         Adicionar
//                     </button>
//                 </div>

//                 {renderList('Líderes *', 'lideres', lideres)}
//                 {renderList('Anfitriões', 'anfitrioes', anfitrioes)}
//                 {renderList('Endereços', 'enderecos', enderecos)}
//                 {renderList('Telefones', 'telefones', telefones)}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-emerald-600 text-white py-3 rounded font-semibold"
//                 >
//                     {loading ? 'Criando...' : 'Criar Célula'}
//                 </button>

//                 {onSuccess && (
//                     <button
//                         type="button"
//                         onClick={onSuccess}
//                         className="w-full bg-gray-300 py-3 rounded font-semibold"
//                     >
//                         Cancelar
//                     </button>
//                 )}
//             </form>
//         </div>
//     );
// }
