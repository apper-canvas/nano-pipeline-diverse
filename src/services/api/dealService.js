import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

export const dealService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.fetchRecords('deal_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "contact_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "close_date_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "ModifiedOn", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error("Error fetching deals:", error?.message || error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.getRecordById('deal_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "contact_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "close_date_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.message || error)
      return null
    }
  },

  async create(dealData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Name: dealData.title_c || dealData.title || "",
            title_c: dealData.title_c || dealData.title || "",
            value_c: dealData.value_c ? parseFloat(dealData.value_c) : (dealData.value ? parseFloat(dealData.value) : 0),
            stage_c: dealData.stage_c?.toString() || dealData.stage?.toString() || "",
            contact_id_c: dealData.contact_id_c ? parseInt(dealData.contact_id_c) : (dealData.contactId ? parseInt(dealData.contactId) : null),
            close_date_c: dealData.close_date_c || dealData.closeDate || null,
            probability_c: dealData.probability_c || dealData.probability || "0-5",
            notes_c: dealData.notes_c || dealData.description || ""
          }
        ]
      }

      const response = await apperClient.createRecord('deal_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to create deal:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error creating deal:", error?.message || error)
      return null
    }
  },

  async update(id, dealData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: dealData.title_c || dealData.title || "",
            title_c: dealData.title_c || dealData.title || "",
            value_c: dealData.value_c ? parseFloat(dealData.value_c) : (dealData.value ? parseFloat(dealData.value) : 0),
            stage_c: dealData.stage_c?.toString() || dealData.stage?.toString() || "",
            contact_id_c: dealData.contact_id_c ? parseInt(dealData.contact_id_c) : (dealData.contactId ? parseInt(dealData.contactId) : null),
            close_date_c: dealData.close_date_c || dealData.closeDate || null,
            probability_c: dealData.probability_c || dealData.probability || "0-5",
            notes_c: dealData.notes_c || dealData.description || ""
          }
        ]
      }

      const response = await apperClient.updateRecord('deal_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to update deal:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error updating deal:", error?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.deleteRecord('deal_c', {
        RecordIds: [parseInt(id)]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to delete deal:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
        return true
      }

      return false
    } catch (error) {
      console.error("Error deleting deal:", error?.message || error)
      return false
    }
  },

  async updateStage(id, stage) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Id: parseInt(id),
            stage_c: stage?.toString() || ""
          }
        ]
      }

      const response = await apperClient.updateRecord('deal_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to update deal stage:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error updating deal stage:", error?.message || error)
      return null
    }
  }
}