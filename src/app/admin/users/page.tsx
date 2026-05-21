'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useToast } from '@/components/admin/Toaster'

interface AdminUser {
    id: string
    email: string
    full_name: string | null
    status: 'pending' | 'verified' | 'rejected'
    role: 'admin' | 'super_admin'
    created_at: string
    verified_at: string | null
}

type Action = 'verify' | 'reject' | 'promote' | 'demote'

const STATUS_STYLES: Record<AdminUser['status'], string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
}

const STATUS_DOT: Record<AdminUser['status'], string> = {
    pending: 'bg-amber-500 animate-pulse',
    verified: 'bg-emerald-500',
    rejected: 'bg-red-500',
}

export default function AdminUsersPage() {
    const { toast } = useToast()
    const [users, setUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [actionLoading, setActionLoading] = useState<string | null>(null)
    const [confirmAction, setConfirmAction] = useState<{ id: string; action: Action } | null>(null)

    const fetchAll = async (myId: string) => {
        setLoading(true)
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            toast('Failed to load admin users.', 'error')
        } else {
            setUsers(data ?? [])
            // Determine if current user is super_admin
            const me = (data ?? []).find(u => u.id === myId)
            setIsSuperAdmin(me?.role === 'super_admin' && me?.status === 'verified')
        }
        setLoading(false)
    }

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            const myId = session?.user?.id ?? null
            setCurrentUserId(myId)
            if (myId) await fetchAll(myId)
            else setLoading(false)
        }
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const RPC_MAP: Record<Action, string> = {
        verify: 'verify_admin',
        reject: 'reject_admin',
        promote: 'promote_admin',
        demote: 'demote_admin',
    }

    const ACTION_LABEL: Record<Action, string> = {
        verify: 'approved',
        reject: 'rejected',
        promote: 'promoted to super admin',
        demote: 'demoted to admin',
    }

    const runAction = async (userId: string, action: Action) => {
        setActionLoading(userId + action)
        setConfirmAction(null)

        const { error } = await supabase.rpc(RPC_MAP[action], { target_id: userId })

        if (error) {
            toast(error.message || 'Action failed.', 'error')
        } else {
            toast(`User ${ACTION_LABEL[action]} successfully.`, 'success')
            if (currentUserId) await fetchAll(currentUserId)
        }

        setActionLoading(null)
    }

    const pendingCount = users.filter(u => u.status === 'pending').length

    // ── Helpers ──────────────────────────────────────────────────────────────
    const getAvailableActions = (user: AdminUser): Action[] => {
        if (!isSuperAdmin || user.id === currentUserId) return []
        const actions: Action[] = []

        if (user.status === 'pending' || user.status === 'rejected') actions.push('verify')
        if (user.status === 'pending' || user.status === 'verified') actions.push('reject')
        if (user.status === 'verified' && user.role === 'admin') actions.push('promote')
        if (user.status === 'verified' && user.role === 'super_admin') actions.push('demote')

        return actions
    }

    const ACTION_STYLES: Record<Action, string> = {
        verify: 'bg-[#F8A900] hover:bg-[#e09800] text-black',
        reject: 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200',
        promote: 'bg-[#112259]/10 hover:bg-[#112259]/20 text-[#112259] border border-[#112259]/20',
        demote: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200',
    }
    const ACTION_LABEL_BTN: Record<Action, string> = {
        verify: 'Approve',
        reject: 'Reject',
        promote: '↑ Promote',
        demote: '↓ Demote',
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 font-inter">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="font-manrope font-extrabold text-[30px] leading-none tracking-[-0.03em] text-[#112259]">Admin Users</h1>
                        <p className="text-gray-500 text-sm mt-1 font-inter">
                            {isSuperAdmin
                                ? 'Approve, reject, and manage admin access.'
                                : 'View all admin accounts. Only super admins can manage access.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {isSuperAdmin && pendingCount > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <span className="text-sm font-semibold text-amber-700">{pendingCount} awaiting approval</span>
                            </div>
                        )}
                        {!isSuperAdmin && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="text-xs text-gray-500 font-medium">View only</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Legend */}
                {isSuperAdmin && (
                    <div className="bg-[#F8A900]/8 border border-[#F8A900]/20 rounded-xl p-4 text-sm flex flex-wrap gap-4 items-center">
                        <span className="font-manrope font-bold text-[#112259] text-xs uppercase tracking-wider">Actions:</span>
                        <span className="font-inter text-xs text-gray-600"><span className="font-semibold text-[#112259]">Approve</span> — grants access</span>
                        <span className="font-inter text-xs text-gray-600"><span className="font-semibold text-[#112259]">Reject</span> — blocks access</span>
                        <span className="font-inter text-xs text-gray-600"><span className="font-semibold text-[#112259]">↑ Promote</span> — super admin</span>
                        <span className="font-inter text-xs text-gray-600"><span className="font-semibold text-[#112259]">↓ Demote</span> — regular admin</span>
                    </div>
                )}

                {/* Table card */}
                <div className="bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] overflow-hidden">
                    {loading ? (
                        <div className="p-6 space-y-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-16 text-center text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="font-medium">No admin users yet</p>
                            <p className="text-sm mt-1">Users who register will appear here.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        {['User', 'Status', 'Role', 'Joined', isSuperAdmin ? 'Actions' : ''].map(h => (
                                            <th key={h} className={`text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-4 ${h === 'Actions' ? 'text-right' : ''}`}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map(user => {
                                        const actions = getAvailableActions(user)
                                        const isConfirming = confirmAction?.id === user.id

                                        return (
                                            <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${user.status === 'pending' && isSuperAdmin ? 'bg-amber-50/30' : ''}`}>
                                                {/* User */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-[#F8A900] flex items-center justify-center flex-shrink-0 shadow-sm">
                                                            <span className="text-black text-sm font-bold font-manrope">
                                                                {(user.full_name || user.email)[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                                    {user.full_name || '—'}
                                                                </p>
                                                                {user.id === currentUserId && (
                                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F8A900]/15 text-[#112259] flex-shrink-0">You</span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[user.status]}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[user.status]}`} />
                                                        {user.status}
                                                    </span>
                                                </td>

                                                {/* Role */}
                                                <td className="px-5 py-4">
                                                    <span className={`text-xs font-medium capitalize px-2 py-0.5 rounded-md ${user.role === 'super_admin' ? 'bg-purple-50 text-purple-700' : 'text-gray-500'}`}>
                                                        {user.role.replace('_', ' ')}
                                                    </span>
                                                </td>

                                                {/* Joined */}
                                                <td className="px-5 py-4">
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(user.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                {isSuperAdmin && (
                                                    <td className="px-5 py-4">
                                                        {user.id === currentUserId ? (
                                                            <span className="text-xs text-gray-300 block text-right">—</span>
                                                        ) : isConfirming ? (
                                                            /* Inline confirm */
                                                            <div className="flex items-center justify-end gap-2">
                                                                <span className="text-xs text-gray-500">Confirm?</span>
                                                                <button
                                                                    onClick={() => runAction(user.id, confirmAction!.action)}
                                                                    disabled={!!actionLoading}
                                                                    className="cursor-pointer text-xs px-2.5 py-1.5 bg-[#F8A900] hover:bg-[#e09800] text-black rounded-lg transition-colors disabled:opacity-50 font-semibold font-manrope"
                                                                >
                                                                    {actionLoading === user.id + confirmAction?.action ? (
                                                                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                                        </svg>
                                                                    ) : 'Yes'}
                                                                </button>
                                                                <button
                                                                    onClick={() => setConfirmAction(null)}
                                                                    className="cursor-pointer text-xs px-2.5 py-1.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            /* Action buttons */
                                                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                                                {actions.map(action => (
                                                                    <button
                                                                        key={action}
                                                                        onClick={() => setConfirmAction({ id: user.id, action })}
                                                                        disabled={!!actionLoading}
                                                                        className={`cursor-pointer text-xs px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40 font-medium ${ACTION_STYLES[action]}`}
                                                                    >
                                                                        {ACTION_LABEL_BTN[action]}
                                                                    </button>
                                                                ))}
                                                                {actions.length === 0 && (
                                                                    <span className="text-xs text-gray-300">—</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer note */}
                <p className="text-xs text-gray-400 text-center font-inter">
                    All actions use server-side RPC functions. Changes take effect immediately.
                </p>
            </div>
        </div>
    )
}
